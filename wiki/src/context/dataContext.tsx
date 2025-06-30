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
  const [data, setData] = useState<FileProps[]>([
    {
      id: "adfasdf",
      Name: "report_q1.pdf",
      Size: 234567,
      lastModified: "2025-04-15T10:30:00Z",
      Path: "/documents/reports/2025/report_q1.pdf",
    },
    {
      id: "kj;.hj,k.",
      Name: "meeting_notes.docx",
      Size: 45678,
      lastModified: "2025-06-20T14:12:45Z",
      Path: "/documents/meetings/2025/june/meeting_notes.docx",
    },
    {
      id: "52345werg",
      Name: "project_plan.docx",
      Size: 78901,
      lastModified: "2025-06-01T09:00:00Z",
      Path: "/documents/projects/plan/project_plan.docx",
    },
    {
      id: "6hhndn",
      Name: "invoice_1043.pdf",
      Size: 12345,
      lastModified: "2025-05-30T11:05:22Z",
      Path: "/documents/invoices/2025/invoice_1043.pdf",
    },
    {
      id: "dfgndfghjhy",
      Name: "client_agreement.docx",
      Size: 90234,
      lastModified: "2025-06-25T08:15:10Z",
      Path: "/documents/contracts/client_agreement.docx",
    },
  ]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function fetchData() {
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
  }

  async function addData(newFile: File) {
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
  }

  async function removeData(id: string) {
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
  }

  async function updateData(newFile: File, id: string) {
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
