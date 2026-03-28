export interface RRVaultConfig {
  accessKey: string;
  appId: string;
  baseUrl?: string;
}

export interface UploadOptions {
  fileName: string;
  fileType: string;
  file: File | Buffer | Blob;
}

export interface UploadResponse {
  link: string;
  id: string;
}
