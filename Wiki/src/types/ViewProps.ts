import type { SetStateAction } from "react";
import type { FileProps } from "./FileType";

export type ViewProps = {
  data: FileProps[];
  handleDelete: (id: string) => void;
  setSelected: React.Dispatch<SetStateAction<FileProps>>;
  isOpen: React.Dispatch<SetStateAction<boolean>>;
};
