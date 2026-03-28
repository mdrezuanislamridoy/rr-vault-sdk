import { setConfig, validateConfig } from "./config.js";
import { upload as s3Upload, deleteFile as s3Delete } from "./s3.js";
import { RRVaultConfig, R2Config, UploadOptions, UploadResult, DeleteResult } from "./types.js";

export class RRVault {

  static config(config: RRVaultConfig) {
    setConfig(config);
  }

  /**
   * Validates the configuration with the external API.
   */
  static async validate(): Promise<boolean> {
    return await validateConfig();
  }


  static async upload(
    file: any,
    fileName: string,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    return await s3Upload(file, fileName, options);
  }

  static async delete(key: string): Promise<DeleteResult> {
    return await s3Delete(key);
  }
}

// Functional approach exports
export { 
  setConfig as config, 
  validateConfig as validate,
  s3Upload as upload, 
  s3Delete as deleteFile 
};

// Type exports
export type { 
  RRVaultConfig,
  R2Config, 
  UploadOptions, 
  UploadResult, 
  DeleteResult 
};
