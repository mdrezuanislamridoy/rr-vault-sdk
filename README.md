# @rr-vault/r2 🚀

**RR-Vault R2 SDK** is a developer-first cloud storage client designed for securely uploading, managing, and delivering files using API keys and app-based access.

This SDK acts as a **Secure Thin Client**. Instead of storing cloud credentials (like R2/S3 keys) on the client-side, it proxies all requests through your backend API, ensuring your infrastructure remains 100% private.

---

## 📦 Installation

Install the package via npm:

```bash
npm install @rr-vault/r2
```

---

## ⚡ Quick Start

### 1. Configure the SDK
Initialize the SDK with your `appId`, `apiKey`, and `secretKey`. These will be sent to your backend with every request for verification.

```typescript
import { RRVault } from '@rr-vault/r2';

RRVault.config({
  appId: 'your-app-id',
  apiKey: 'your-api-key',
  secretKey: 'your-secret-key'
});
```

### 2. Upload a File
The SDK sends the file and your credentials to your backend API (`/api/v1/upload`). Your backend then handles the actual storage logic.

```typescript
try {
  const fileContent = Buffer.from("Hello RR-Vault!"); // Or a File/Blob/Uint8Array
  
  const result = await RRVault.upload(fileContent, "myfile.txt", {
    folder: "documents",
    contentType: "text/plain"
  });

  console.log("Upload Success:", result.url);
  console.log("Storage Key:", result.key);
} catch (error) {
  console.error("Upload failed:", error.message);
}
```

### 3. Delete a File
Delete files securely by sending a delete request through your proxy.

```typescript
const result = await RRVault.delete("documents/171165...-myfile.txt");

if (result.success) {
  console.log("File deleted successfully");
} else {
  console.log("Delete failed:", result.message);
}
```

---

## 🛡️ Security Architecture
The SDK implements a **Zero-Secret Client Policy**:
- **No Cloud Keys:** Access Key IDs and Secret Access Keys for R2/S3 are **NEVER** stored in the SDK or frontend code.
- **Backend Proxy:** All operations (`upload`, `delete`) are routed through your server. 
- **Centralized Validation:** Your backend validates the `appId` and `secretKey` before interacting with the storage provider.

---

## 🛠️ API Reference

### `RRVault.config(options: RRVaultConfig)`
Sets up the SDK credentials.
- `appId`: Your application ID.
- `apiKey`: Your application API key.
- `secretKey`: Your secret key.

### `RRVault.upload(file, fileName, options?)`
Uploads a file via your backend proxy.
- `file`: Buffer, Blob, or Uint8Array.
- `fileName`: Original name of the file.
- `options`:
  - `folder`: (Optional) Virtual folder path.
  - `contentType`: (Optional) MIME type.
  - `metadata`: (Optional) Key-value pairs for storage metadata.

### `RRVault.delete(key)`
Deletes a file by its key via your backend proxy.
- `key`: The storage key returned during upload.

---

## 📄 Types

```typescript
export interface UploadResult {
    key: string;       // Unique storage path
    url: string;       // Public delivery URL
    etag?: string;     // entity tag
}

export interface DeleteResult {
    success: boolean;
    message?: string;
}
```

---

## ⚖️ License
ISC License. Built with ❤️ by Md. Ridoy Babu.
