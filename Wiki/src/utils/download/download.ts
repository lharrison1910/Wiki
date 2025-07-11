import { useData } from "../../context/dataContext";
import { client } from "../client/client";

export const download = async (filename: string) => {
  const { setErrorMsg } = useData();
  try {
    await fetch(`${client}/download/${filename}`).then((res) => {
      res.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = filename;
        alink.click();
      });
    });
  } catch (error: any) {
    setErrorMsg(error.message);
  }
};
