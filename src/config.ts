import { RRVaultConfig, R2Config } from "./types.js";
import axios from "axios";

const VALIDATION_API_URL = "http://localhost:8888/api/v1/validate";

const R2_INTERNAL: R2Config = {
  accountId: "cc0a96d7f01e9dd678a07a57dd665897",
  bucketName: "rr-vault",
  publicUrl: "https://pub-52b747d8c2c34c10bc750a3beaaf1ca4.r2.dev",

  // আপনার রিয়াল Cloudflare R2 ক্রেডেনশিয়াল এখানে দিন:
  accessKeyId: "e23c8e4f75168abdd8e2e6af3bf11f4b",
  secretAccessKey: "90bc656fdb5759fa695ada337377481f825eb5aae0981def6a3c69d0394547e9"
};

let userConfig: RRVaultConfig | null = null;
let validationPerformed = false;

export function setConfig(newConfig: RRVaultConfig) {
  userConfig = { ...newConfig };
  validationPerformed = false; // Reset validation on new config
}

export function getConfig(): R2Config {
  if (!userConfig) {
    throw new Error(
      "RRVault: SDK not configured. Please call RRVault.config() first."
    );
  }

  // Map user-facing appId/secretKey to internal R2 credentials
  return { ...R2_INTERNAL };
}

interface ValidationResponse {
  valid: boolean;
}

/**
 * Validates the configuration by hitting an external API.
 */
export async function validateConfig(): Promise<boolean> {
  if (!userConfig) {
    throw new Error(
      "RRVault: SDK not configured. Please call RRVault.config() first."
    );
  }

  try {
    const response = await axios.post<ValidationResponse>(VALIDATION_API_URL, {
      appId: userConfig.appId,
      secretKey: userConfig.secretKey,
    });

    // Expecting response format: { valid: boolean }
    return response.status === 200 && response.data.valid === true;
  } catch (error: any) {
    console.error("RRVault Validation Error:", error.message);
    return false;
  }
}

/**
 * Ensures the configuration is valid by performing a lazy check.
 * Throws an error if validation fails.
 */
export async function ensureValidConfig(): Promise<void> {
  if (validationPerformed) return;

  const isValid = await validateConfig();
  if (!isValid) {
    throw new Error(
      "RRVault: Configuration validation failed. Please check your appId and secretKey."
    );
  }

  validationPerformed = true;
}

