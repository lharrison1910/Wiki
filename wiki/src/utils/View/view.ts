import { client } from "../client/client";

export const View = async (filename: string) => {
  try {
    await fetch(`${client}/db/download/${filename}`).then((res) => {
      res.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.target = "_blank";
        alink.click();
      });
    });
  } catch (error) {
    console.error(`View failed: ${error}`);
  }
};
