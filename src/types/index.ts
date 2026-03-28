export interface RRVaultConfig {
  apiKey: string;
  appId: string;
  baseURL?: string;
}

export interface UploadOptions {
  fileName: string;
  fileType: string;
  file: File | Buffer;
}
