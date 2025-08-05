import type { Dispatch, SetStateAction } from "react";
import { filesClient } from "../client/client";
import type { FileType } from "../../types/FileType";

export const fetchFiles = async () => {
  const response = await fetch(`${filesClient}`);
  return await response.json();
};

export const addFile = async (
  newFile: File,
  setErrorMsg: Dispatch<SetStateAction<string | null>>,
  setSuccessMsg: Dispatch<SetStateAction<string | null>>
) => {
  console.log(newFile);
  const formData = new FormData();
  formData.append("file", newFile);
  try {
    await fetch(`${filesClient}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res.statusText))
      .catch((error) => {
        console.log(error);
        throw new Error(`Error uploading file: ${error}`);
      });
    setSuccessMsg(`Successfully uploaded File`);
  } catch (error) {
    console.error("Error uploading file:", error);
    setErrorMsg(`Error uploading file: ${error}`);
  }
};

export const deleteFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await fetch(`${filesClient}/delete`, {
    method: "Delete",
    body: formData,
  })
    .then((res) => res.text())
    .catch((error) => {
      console.log(`Error occured: ${error}`);
      throw new Error(`Error occured: ${error}`);
    });
};
