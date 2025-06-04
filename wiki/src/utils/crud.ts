import PocketBase from "pocketbase";
import type { FileProps } from "../types/FileType";

//const pb = new PocketBase("http://192.168.1.3:8089");
const pb = new PocketBase("http://127.0.0.1:8089");

interface FormProps {
  FileName: string;
  Size: number;
  lastModified: string;
  file: File;
}

interface CreateProps {
  form: FormProps;
  setErrorMsg: (msg: string) => void;
  setSuccessMsg: (msg: string) => void;
}
export async function Create({
  form,
  setErrorMsg,
  setSuccessMsg,
}: CreateProps) {
  try {
    await pb.collection("Wiki").create(form);
    setSuccessMsg("Record added");
  } catch (error) {
    console.log(error);
    setErrorMsg(`Something went wrong: ${error}`);
  }
}

export async function Update({
  id,
  form,
  setErrorMsg,
  setSuccessMsg,
}: CreateProps) {
  try {
    await pb.collection("Wiki").update(id, form);
    setSuccessMsg(`${form.FileName} has been updated`);
  } catch (error) {
    console.log(error);
    setErrorMsg(`Something went wrong: ${error}`);
  }
}

interface DeleteProps {
  id: string;
  setErrorMsg: (msg: string) => void;
  setSuccessMsg: (msg: string) => void;
}
export async function Delete({ id, setErrorMsg, setSuccessMsg }: DeleteProps) {
  try {
    await pb.collection("Wiki").delete(id);
    setSuccessMsg("Deleted Successfully");
  } catch (error) {
    console.log(error);
    setErrorMsg(`Something went wrong: ${error}`);
  }
}

interface ReadProps {
  setData: (records: FileProps[]) => void;
  setErrorMsg: (msg: string) => void;
}
export async function Read({ setData, setErrorMsg }: ReadProps) {
  try {
    //const records = await pb.collection("Wiki").getFullList();
    const records = [
      {
        id: "a string of characters",
        FileName: "File 1",
        Size: 100,
        lastModified: "2025/06/02",
        file: "aaaaaa",
      },
      {
        id: "a different string of characters",
        FileName: "File 2",
        Size: 250,
        lastModified: "2025/06/02",
        file: "bbbbbb",
      },
      {
        id: "sdafasdfters",
        FileName: "File 3",
        Size: 250,
        lastModified: "2025/06/02",
        file: "bbbbbb",
      },
      {
        id: "eeeee",
        FileName: "File 4",
        Size: 100,
        lastModified: "2025/06/02",
        file: "aaaaaa",
      },
      {
        id: "ffff",
        FileName: "File 5",
        Size: 250,
        lastModified: "2025/06/02",
        file: "bbbbbb",
      },
      {
        id: "sdfgsdfg",
        FileName: "File 6",
        Size: 250,
        lastModified: "2025/06/02",
        file: "bbbbbb",
      },
      {
        id: "tyuitym",
        FileName: "File 7",
        Size: 250,
        lastModified: "2025/06/02",
        file: "bbbbbb",
      },
    ];
    setData(records);
  } catch (error) {
    console.log(error);
    setErrorMsg(`Something went wrong: ${error}`);
  }
}
