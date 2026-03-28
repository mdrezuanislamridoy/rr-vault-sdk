import { setConfig, getConfig } from "./core/config";
import { upload } from "./core/upload";
import { deleteFile, viewFile } from "./core/file";
import { RRVaultConfig, UploadOptions, UploadResponse } from "./types/index";

export class RRVault {
  /**
   * Configure the RRVault SDK with your Access Key and App ID.
   * @param config - Configuration object containing accessKey and appId.
   */
  static config(config: RRVaultConfig) {
    setConfig(config);
  }

  /**
   * Upload a file to RRVault.
   * @param options - Upload options including file, fileName, and fileType.
   * @returns A promise that resolves to an UploadResponse containing the link and id.
   */
  static async upload(options: UploadOptions): Promise<UploadResponse> {
    return await upload(options);
  }

  /**
   * Delete a file from RRVault by its ID.
   * @param id - The ID of the file to delete.
   * @returns A promise that resolves to the API response.
   */
  static async delete(id: string) {
    return await deleteFile(id);
  }

  /**
   * View file metadata or details from RRVault by its ID.
   * @param id - The ID of the file to view.
   * @returns A promise that resolves to the API response.
   */
  static async view(id: string) {
    return await viewFile(id);
  }
}

// Export individual functions for functional approach if preferred
export { setConfig as config, upload, deleteFile as delete, viewFile as view };
export type { RRVaultConfig, UploadOptions, UploadResponse };
