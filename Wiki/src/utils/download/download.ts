import { filesClient } from "../client/client";

export const download = async (url: string) => {
  try {
    await fetch(`${filesClient}/file/download`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ url }),
    }).then((res) => {
      res.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = url;
        alink.click();
      });
    });
  } catch (error) {
    console.error(`Download failed: ${error}`);
  }
};
