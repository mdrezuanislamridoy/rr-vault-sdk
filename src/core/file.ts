import axios from "axios";
import { getConfig } from "./config";

export async function deleteFile(id: string) {
  const config = getConfig();
  try {
    const response = await axios.delete(`${config.baseUrl}/file/${id}`, {
      headers: {
        "Authorization": `Bearer ${config.accessKey}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`RRVault Delete Failed: ${error.response?.data?.message || error.message}`);
  }
}

export async function viewFile(id: string) {
  const config = getConfig();
  try {
    const response = await axios.get(`${config.baseUrl}/file/${id}`, {
      headers: {
        "Authorization": `Bearer ${config.accessKey}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`RRVault View Failed: ${error.response?.data?.message || error.message}`);
  }
}
