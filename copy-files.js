import fs from "fs-extra";

async function copyFiles() {
  try {
    await fs.copy("src", "dist");
    console.log("Successfully copied src/ to dist/");
  } catch (err) {
    console.error(" Error copying files:", err);
  }
}

copyFiles();
