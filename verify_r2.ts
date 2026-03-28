import { RRVault } from "./src/index";


const testConfig = {
  appId: "YOUR_APP_ID",
  secretKey: "YOUR_SECRET_KEY",
};


async function runTest() {
  console.log("🚀 Starting RRVault R2 Test...");

  try {
    // 1. Configure
    RRVault.config(testConfig);
    console.log("✅ Configured successfully.");

    // 2. Upload
    const fileContent = Buffer.from("Hello RRVault R2!");
    const uploadResult = await RRVault.upload(fileContent, "test.txt", {
      folder: "tests",
      contentType: "text/plain",
    });
    console.log("✅ Upload successful:", uploadResult);

    // 3. Delete
    console.log("🕒 Waiting 2 seconds before delete...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const deleteResult = await RRVault.delete(uploadResult.key);
    console.log("✅ Delete result:", deleteResult);

  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// runTest();
console.log("Verification script ready. Update credentials and uncomment runTest() to execute.");
