import axios from "axios";
import { getConfig } from "./config";
import { UploadOptions, UploadResponse } from "../types";

/**
 * Upload a file to RRVault Cloud via the website's API.
 * @param options - Contains the file, fileName, and fileType.
 * @returns {Promise<UploadResponse>} - The generated link and ID for the file.
 */
export async function upload(options: UploadOptions): Promise<UploadResponse> {
  const config = getConfig();

  const formData = new FormData();

  // Handle both Browser and Node.js environments
  if (typeof options.file === "object" && "pipe" in options.file) {
      // Stream in Node.js (if any) - simplified for Buffer/Blob
      formData.append("file", options.file as any, options.fileName);
  } else {
      formData.append("file", options.file as any, options.fileName);
  }

  formData.append("appId", config.appId);

  try {
    const response = await axios.post(`${config.baseUrl}/upload`, formData, {
      headers: {
        "Authorization": `Bearer ${config.accessKey}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data || !response.data.id || !response.data.link) {
        throw new Error("Invalid response from server");
    }

    return {
        id: response.data.id,
        link: response.data.link
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(`RRVault Upload Failed: ${errorMessage}`);
  }
}
