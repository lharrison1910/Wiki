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

  async function fetchData() {
    try {
      const response = await fetch(`${client}/fetch`);
      if (!response.ok) {
        console.log(response.statusText);
      }
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      setErrorMsg(`Something went wrong: ${error}`);
    }
  }

  async function addData(newData: FileProps) {
    console.log(newData);
    try {
      const response = await fetch(`${client}/post`, {
        method: "post",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setErrorMsg(`Something went wrong: ${response.statusText}`);
        return;
      }
      setData([...data, newData]);
      setSuccessMsg("Successful upload.");
    } catch (error) {
      setErrorMsg(`Something went wrong: ${error}`);
    }
  }

  async function removeData(id: string) {
    try {
      const response = await fetch(`${client}/delete/${id}`, {
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
  }

  async function updateData(newData: FileProps) {
    try {
      const response = await fetch(`${client}/update`, {
        method: "patch",
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        setErrorMsg(`Something went wrong: ${response.statusText}`);
        return;
      }

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
      setSuccessMsg(`File ${newData.FileName} has been updated`);
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
