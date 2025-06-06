import { createContext, useContext, useState, type ReactNode } from "react";
import PocketBase from "pocketbase";
import type { FileProps } from "../types/FileType";

const pb = new PocketBase("http://127.0.0.1:8089");

interface DataContextType {
  data: FileProps[];
  errorMsg: string | null;
  successMsg: string | null;
  setData: (things: FileProps[]) => void;
  setErrorMsg: (msg: string | null) => void;
  setSuccessMsg: (msg: string | null) => void;
  addData: (newData: FileProps) => void;
  removeData: (id: string) => void;
  updateData: (newData: FileProps) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData has to be wrapped by DataProvider");
  }
  return context;
}

interface DataProviderProps {
  children: ReactNode;
}
export function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<FileProps[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function addData(newData: FileProps) {
    try {
      const temp = data;
      const toSend = {
        FileName: newData.FileName,
        Size: newData.Size,
        lastModified: newData.lastModified,
        file: newData.file,
      };
      temp?.push(newData);
      setData(temp);
      await pb.collection("Wiki").create(toSend);
      setSuccessMsg("File added");
    } catch (error) {
      setErrorMsg(`Something went wronng: ${error}`);
    }
  }

  async function removeData(id: string) {
    try {
      if (data !== null) {
        await pb.collection("Wiki").delete(id);
        setData(data.filter((d) => d.id != id));
        setSuccessMsg(`File has been removed.`);
      }
    } catch (error) {
      setErrorMsg(`Something went wrong: ${error}`);
    }
  }

  async function updateData(newData: FileProps) {
    try {
      await pb.collection("Wiki").update(newData.id, newData);
      setData(
        data.map((d) => {
          if (d.id === newData.id) {
            return {
              ...d,
              FileName: newData.FileName,
              Size: newData.Size,
              lastModified: newData.lastModified,
              file: newData.file,
            };
          } else {
            return d;
          }
        })
      );
    } catch (error) {
      setErrorMsg(`Something went wrong: ${error}`);
    }
  }

  return (
    <DataContext.Provider
      value={{
        data,
        errorMsg,
        successMsg,
        setData,
        setErrorMsg,
        setSuccessMsg,
        addData,
        removeData,
        updateData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
