# @rr-vault/sdk 🚀

**RR-Vault SDK** is a developer-first cloud storage client designed for securely uploading, managing, and delivering files using API keys, app-based access, and scalable infrastructure. 

Built on top of Cloudflare R2 (S3-compatible), it provides a simplified interface with **Automatic Lazy Validation** against your backend API.

---

## 📦 Installation

Install the package via npm:

```bash
npm install @rr-vault/sdk
```

---

## ⚡ Quick Start

### 1. Configure the SDK
Initialize the SDK with your `appId`, `apiKey` and `secretKey`. These will be validated automatically when you perform your first operation.

```typescript
import { RRVault } from '@rr-vault/sdk';

RRVault.config({
  appId: 'your-app-id',
  apiKey: 'your-api-key',
  secretKey: 'your-secret-key'
});
```

### 2. Upload a File
The validation happens automatically during the first upload. If the credentials are invalid, an error will be thrown.

```typescript
try {
  const fileContent = Buffer.from("Hello RR-Vault!"); // Or a File blob in browser
  
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
Delete files using their unique storage key.

```typescript
const result = await RRVault.delete("documents/171165...-myfile.txt");

if (result.success) {
  console.log("File deleted successfully");
} else {
  console.log("Delete failed:", result.message);
}
```

---

## 🛡️ Automatic Lazy Validation
The SDK uses a "Lazy Validation" mechanism to stay fast and efficient:
- `RRVault.config()` only stores credentials locally.
- The **first call** to `upload()` or `delete()` triggers a validation request to the backend.
- Results are cached for the duration of the session, so subsequent calls are instantaneous.

---

## 🛠️ API Reference

### `RRVault.config(options: RRVaultConfig)`
Sets up the SDK credentials.
- `appId`: Your application ID.
- `secretKey`: Your secret key.

### `RRVault.upload(file, fileName, options?)`
Uploads a file to the cloud.
- `file`: Buffer, Blob, or Uint8Array.
- `fileName`: Original name of the file.
- `options`:
  - `folder`: (Optional) Virtual folder path.
  - `contentType`: (Optional) MIME type of the file.
  - `metadata`: (Optional) Key-value pairs for storage metadata.

### `RRVault.delete(key)`
Deletes a file by its key.
- `key`: The storage key returned during upload.

---

## 📄 Types

```typescript
export interface UploadResult {
    key: string;       // Unique storage path
    url: string;       // Public delivery URL
    etag?: string;     // AWS S3 entity tag
}

export interface DeleteResult {
    success: boolean;
    message?: string;
}
```

---

## ⚖️ License
ISC License. Built with ❤️ by Md. Ridoy Babu.
