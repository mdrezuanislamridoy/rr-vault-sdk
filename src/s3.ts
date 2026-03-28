import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getConfig, ensureValidConfig } from "./config.js";
import { UploadOptions, UploadResult, DeleteResult } from "./types.js";

let s3Client: S3Client | null = null;

function getS3Client() {
  if (s3Client) return s3Client;
  const config = getConfig();
  
  s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
  
  return s3Client;
}

/**
 * Helper to determine MIME type based on file extension.
 */
function getMimeType(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  const mimeMap: Record<string, string> = {
    // Images
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
    "webp": "image/webp",
    "svg": "image/svg+xml",
    "ico": "image/x-icon",
    // Documents
    "pdf": "application/pdf",
    "txt": "text/plain",
    "html": "text/html",
    "css": "text/css",
    "js": "application/javascript",
    "json": "application/json",
    // Audio/Video
    "mp3": "audio/mpeg",
    "wav": "audio/wav",
    "mp4": "video/mp4",
    "webm": "video/webm",
    // Archives
    "zip": "application/zip",
    "rar": "application/x-rar-compressed",
  };

  return mimeMap[ext || ""] || "application/octet-stream";
}

/**
 * Upload a file to Cloudflare R2
 * @param file - File content (Buffer, Blob, Uint8Array)
 * @param fileName - Original name of the file
 * @param options - Additional upload options
 */
export async function upload(
  file: any,
  fileName: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  await ensureValidConfig();
  const config = getConfig();
  const client = getS3Client();
  
  // Clean folder path and construct key
  const folder = options.folder ? `${options.folder.replace(/\/$/, "")}/` : "";
  const key = `${folder}${Date.now()}-${fileName.replace(/\s+/g, "-")}`;

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: key,
    Body: file,
    ContentType: options.contentType || getMimeType(fileName),
    Metadata: options.metadata,
    CacheControl: options.cacheControl,
  });

  const response = await client.send(command);

  // Construct public URL
  const baseUrl = config.publicUrl 
    ? config.publicUrl.replace(/\/$/, "") 
    : `https://${config.bucketName}.${config.accountId}.r2.dev`;
    
  const url = `${baseUrl}/${key}`;

  return {
    key,
    url,
    etag: response.ETag,
  };
}

/**
 * Delete a file from Cloudflare R2
 * @param key - The storage key (path) of the file
 */
export async function deleteFile(key: string): Promise<DeleteResult> {
  await ensureValidConfig();
  const config = getConfig();
  const client = getS3Client();

  const command = new DeleteObjectCommand({
    Bucket: config.bucketName,
    Key: key,
  });

  try {
    await client.send(command);
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.message || "Failed to delete file from R2" 
    };
  }
}
