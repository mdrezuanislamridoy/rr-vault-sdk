import { setConfig } from "./config.js";
import { upload, deleteFile } from "./s3.js";
import { RRVaultConfig, UploadOptions, UploadResult, DeleteResult } from "./types.js";

export class RRVault {

  static config(config: RRVaultConfig) {
    setConfig(config);
  }

  static async upload(
    file: any,
    fileName: string,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    return await upload(file, fileName, options);
  }

  static async delete(key: string): Promise<DeleteResult> {
    return await deleteFile(key);
  }
}

export {
  setConfig as config,
  upload,
  deleteFile
};

export type {
  RRVaultConfig,
  UploadOptions,
  UploadResult,
  DeleteResult
};
