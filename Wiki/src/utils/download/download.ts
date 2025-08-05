import { filesClient } from "../client/client";

export const download = async (filename: string) => {
  try {
    await fetch(`${filesClient}/download/${filename}`).then((res) => {
      res.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = filename;
        alink.click();
      });
    });
  } catch (error) {
    console.error(`Download failed: ${error}`);
  }
};
