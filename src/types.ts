export interface RRVaultConfig {
    appId: string;
    apiKey: string;
    secretKey: string;

}

export interface UploadOptions {
    folder?: string;
    contentType?: string;
    metadata?: Record<string, string>;
    cacheControl?: string;
}

export interface UploadResult {
    key: string;
    url: string;
    etag?: string;
}

export interface DeleteResult {
    success: boolean;
    message?: string;
}
