import { createContext, useContext, useState, type ReactNode } from "react";
import { client } from "../utils/client/client";
import type { FileProps } from "../types/FileType";

interface DataContextType {
  data: FileProps[];
  errorMsg: string | null;
  successMsg: string | null;
  setData: (things: FileProps[]) => void;
  setErrorMsg: (msg: string | null) => void;
  setSuccessMsg: (msg: string | null) => void;
  fetchData: () => void;
  addData: (newData: File) => void;
  removeData: (id: string) => void;
  updateData: (newData: File, id: string) => void;
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

  const fetchData = async () => {
    try {
      const response = await fetch(`${client}/api`);
      if (!response.ok) {
        console.log(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setErrorMsg(`Something went wrong: ${error}`);
    }
  };

  const addData = async (newFile: File) => {
    console.log(newFile);
    const formData = new FormData();
    formData.append("file", newFile);
    try {
      const response = await fetch(`${client}/api/post`, {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        console.log("problems");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async (id: string) => {
    try {
      const response = await fetch(`${client}/api/delete/?id=${id}`, {
        method: "delete",
      });

      if (!response.ok) {
        setErrorMsg(`Something went wrong: ${response.statusText}`);
        return;
      }
      setData(data.filter((d) => d.id !== id));
      setSuccessMsg(`File was removed`);
    } catch (error) {
      setErrorMsg(`Something went wrong: ${error}`);
    }
  };

  const updateData = async (newFile: File, id: string) => {
    const formData = new FormData();
    formData.append("file", newFile);
    try {
      const response = await fetch(`${client}/api/patch?id=${id}`, {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        setErrorMsg(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        errorMsg,
        successMsg,
        setData,
        setErrorMsg,
        setSuccessMsg,
        fetchData,
        addData,
        removeData,
        updateData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
