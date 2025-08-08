import { filesClient } from "../client/client";

export const download = async (path: string) => {
  try {
    await fetch(`${filesClient}/download/${path}`).then((res) => {
      res.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = path;
        alink.click();
      });
    });
  } catch (error) {
    console.error(`Download failed: ${error}`);
  }
};
