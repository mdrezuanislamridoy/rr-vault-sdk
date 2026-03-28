import { RRVaultConfig } from "../types/index";

let config: RRVaultConfig = {
  apiKey: "",
  appId: "",
  baseURL: "http://localhost:8888",
};

export function setConfig(newConfig: RRVaultConfig) {
  config = { ...config, ...newConfig };
}

export function getConfig() {
  if (!config.apiKey || !config.appId) {
    throw new Error("API Key or App ID not found");
  }
  return config;
}


