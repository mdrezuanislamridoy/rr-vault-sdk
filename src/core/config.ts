import { RRVaultConfig } from "../types/index";

let config: RRVaultConfig = {
  accessKey: "",
  appId: "",
  baseUrl: "https://api.rrvault.com", // Temporary default
};

export function setConfig(newConfig: RRVaultConfig) {
  config = { ...config, ...newConfig };
}

export function getConfig() {
  if (!config.accessKey || !config.appId) {
    throw new Error("RRVault: Access Key or App ID not found. Please call setConfig first.");
  }
  return config;
}


