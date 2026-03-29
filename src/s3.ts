import axios from "axios";
import { getUserConfig, getApiUrl } from "./config.js";
import { UploadOptions, UploadResult, DeleteResult } from "./types.js";
import { AxiosResponse } from "axios";

export async function upload(
  file: any,
  fileName: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const config = getUserConfig();
  const apiUrl = getApiUrl();

  const fileBlob = typeof Blob !== 'undefined' && file instanceof Blob 
    ? file 
    : new Blob([file]);

  const formData = new FormData();

  formData.append("appId", config.appId);
  formData.append("apiKey", config.apiKey);
  formData.append("secretKey", config.secretKey);
  
  if (options.folder) formData.append("folder", options.folder);
  if (options.contentType) formData.append("contentType", options.contentType);
  if (options.cacheControl) formData.append("cacheControl", options.cacheControl);
  if (options.metadata) {
    formData.append("metadata", JSON.stringify(options.metadata));
  }

  formData.append("file", fileBlob, fileName);
  formData.append("fileName", fileName);

  try {
    const response: AxiosResponse<UploadResult> = await axios.post(apiUrl, formData);

    return response.data;
  } catch (error: any) {
    throw new Error(
      `RRVault Upload Failed: ${error.response?.data?.message || error.message}`
    );
  }
}

export async function deleteFile(key: string): Promise<DeleteResult> {
  const config = getUserConfig();
  const apiUrl = getApiUrl();

  try {
    const response: AxiosResponse<DeleteResult> = await axios({
      method: "DELETE",
      url: apiUrl,
      data: {
        key,
        appId: config.appId,
        apiKey: config.apiKey,
        secretKey: config.secretKey,
      },
    });

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to delete file",
    };
  }
}
