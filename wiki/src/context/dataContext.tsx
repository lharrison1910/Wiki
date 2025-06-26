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

  function validFile(file: File) {
    if (!file.type.startsWith("pdf/") || !file.type.startsWith("docx/")) {
      return "Invalid type, please upload pdf's or docx's only";
    }

    if (file.size > 1000000) {
      return "File too large, file must be under 1 MB";
    }

    return true;
  }

  async function fetchData() {
    try {
      const response = await fetch(`${client}/fetch`);
      if (!response.ok) {
        console.log(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setErrorMsg(`Something went wrong: ${error}`);
    }
  }

  async function addData(file: File) {
    const valid = validFile(file);
    if (valid) {
      try {
        const response = await fetch(`${client}/post`, {
          method: "post",
          body: JSON.stringify(file),
        });

        if (!response.ok) {
          setErrorMsg(`Something went wrong: ${response.statusText}`);
          return;
        }
        // setData([...data, newData]);
        setSuccessMsg("Successful upload.");
        fetchData();
      } catch (error) {
        setErrorMsg(`Something went wrong: ${error}`);
      }
    } else {
      setErrorMsg(valid);
      return;
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

  async function updateData(file: File, id: string) {
    const valid = validFile(file);
    if (valid) {
      try {
        const response = await fetch(`${client}/update/${id}`, {
          method: "patch",
          body: JSON.stringify(file),
        });
        if (!response.ok) {
          setErrorMsg(`Something went wrong: ${response.statusText}`);
          return;
        }
        setSuccessMsg(`File ${file.name} has been updated`);
        fetchData();
      } catch (error) {
        setErrorMsg(`Something went wrong: ${error}`);
      }
    } else {
      setErrorMsg(valid);
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
