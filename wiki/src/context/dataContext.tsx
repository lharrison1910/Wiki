import { createContext, useContext, useEffect, useState } from "react";
import { Read } from "../utils/crud";
import type { FileProps } from "../types/FileType";

interface DataContextProps {
  data: FileProps[] | null;
  errorMsg: string | null;
  successMsg: string | null;

  addData: (newData: FileProps) => void;
  removeData: (id: string) => void;
  updateData: (newData: FileProps) => void;
}

const DataContext = createContext<DataContextProps | null>(null);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData has to be wrapped by DataProvider");
  }
  return context;
}

export function DataProvider({ children }: any) {
  const [data, setData] = useState<FileProps[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // its not an issue with the fetch, on first render data is null
  useEffect(() => {
    setData([
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
    ]);
  }, []);

  function addData(newData: FileProps) {
    const temp = data;
    temp?.push(newData);
    setData(temp);
  }

  function removeData(id: string) {
    if (data !== null) {
      setData(data.filter((d) => d.id != id));
    }
  }

  function updateData(newData: FileProps) {
    if (data !== null) {
      setData(
        data.map((d) => {
          if (d.id === newData.id) {
            return newData;
          } else {
            return d;
          }
        })
      );
    }
  }

  return (
    <DataContext.Provider
      value={{ data, errorMsg, successMsg, addData, removeData, updateData }}
    >
      {children}
    </DataContext.Provider>
  );
}
