import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { FileProps } from "../types/FileType";

interface DataContextType {
  data: FileProps[];
  errorMsg: string | null;
  successMsg: string | null;
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
    try {
      console.log(newData, "here");
      const temp = data;
      temp?.push(newData);
      setData(temp);
      setSuccessMsg("File added");
    } catch (error) {
      setErrorMsg(`Something went wronng: ${error}`);
    }
  }

  function removeData(id: string) {
    try {
      if (data !== null) {
        setData(data.filter((d) => d.id != id));
        setSuccessMsg(`File has been removed.`);
      }
    } catch (error) {
      setErrorMsg(`Something went wrong: ${error}`);
    }
  }

  function updateData(newData: FileProps) {
    try {
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
        console.log(data);
      }
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
