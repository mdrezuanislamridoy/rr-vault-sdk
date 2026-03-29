import { RRVaultConfig } from "./types.js";

const VALIDATION_API_URL = "http://localhost:8888/api/v1/validate";

let userConfig: RRVaultConfig | null = null;

export function setConfig(newConfig: RRVaultConfig) {
  userConfig = { ...newConfig };
}

export function getUserConfig(): RRVaultConfig {
  if (!userConfig) {
    throw new Error(
      "RRVault: SDK not configured. Please call RRVault.config() first."
    );
  }
  return userConfig;
}

export function getApiUrl(): string {
  return VALIDATION_API_URL;
}
