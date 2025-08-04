// import { client } from "../client/client";
// import { useData } from "../../context/dataContext";

// const { data, setData, setErrorMsg, setSuccessMsg } = useData();

// export const fetchData = async () => {
//   try {
//     const response = await fetch(`${client}/api`);
//     if (!response.ok) {
//       console.log(response.statusText);
//     }
//     const json = await response.json();
//     setData(json);
//   } catch (error) {
//     setErrorMsg(`Something went wrong: ${error}`);
//   }
// };

// export const addData = async (newFile: File) => {
//   console.log(newFile);
//   const formData = new FormData();
//   formData.append("file", newFile);
//   try {
//     const response = await fetch(`${client}/api/post`, {
//       method: "post",
//       body: formData,
//     });

//     if (!response.ok) {
//       console.log("problems");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const removeData = async (id: string) => {
//   try {
//     const response = await fetch(`${client}/api/delete/?id=${id}`, {
//       method: "delete",
//     });

//     if (!response.ok) {
//       setErrorMsg(`Something went wrong: ${response.statusText}`);
//       return;
//     }
//     setData(data.filter((d) => d._id !== id));
//     setSuccessMsg(`File was removed`);
//   } catch (error) {
//     setErrorMsg(`Something went wrong: ${error}`);
//   }
// };

// export const updateData = async (newFile: File, id: string) => {
//   const formData = new FormData();
//   formData.append("file", newFile);
//   try {
//     const response = await fetch(`${client}/api/patch?id=${id}`, {
//       method: "post",
//       body: formData,
//     });

//     if (!response.ok) {
//       setErrorMsg(response.statusText);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

import type { Dispatch, SetStateAction } from "react";
import { client } from "../client/client";

export const fetchFiles = async () => {
  const response = await fetch(`${client}/files`);
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
    await fetch(`${client}/files/upload`, {
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

export const deleteFile = async (id: string) => {
  return await fetch(`${client}/files/delete`, {
    method: "Delete",
    body: JSON.stringify({ id }),
  })
    .then((res) => res.text())
    .catch((error) => {
      console.log(`Error occured: ${error}`);
      throw new Error(`Error occured: ${error}`);
    });
};
