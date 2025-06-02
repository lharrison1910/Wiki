import { Delete, Download, Edit } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import EditModal from "../EditPopup/EditModel";
import type { FileProps } from "../../types/FileType";

interface ListViewProps {
  data: FileProps[];
  handleDelete: (id: string) => void;
}

function ListView({ data, handleDelete }: ListViewProps) {
  const [open, isOpen] = useState(false);
  const [selected, setSelected] = useState<FileProps>({
    id: "",
    name: "",
    size: 0,
    lastModified: "",
    file: "",
  });

  const TableHeader = [
    { header: "Name" },
    { header: "Last Modified" },
    { header: "Edit" },
    { header: "Download" },
    { header: "Delete" },
  ];

  const handleClose = () => {
    isOpen(false);
  };

  function handleSelected(index: number) {
    setSelected(data[index]);
    isOpen(true);
  }

  function handleDownload(index: number) {
    console.log("this will download file", data[index]);
    //fetch(`web address/api/files/Wiki/${data[index].id}/${data[index].file}?download=1`)
  }

  return (
    <>
      <div className="w-2/3 max-w-2/3 min-w-1/2 m-2  flex justify-center items-center">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {TableHeader.map((h, index) => (
                  <TableCell align="center" key={index}>
                    {h.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((fd, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{fd.name}</TableCell>
                  <TableCell align="center">{fd.lastModified}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleSelected(index)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDownload(index)}>
                      <Download />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(fd.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
                            How does this look
                        </TableFooter> */}
          </Table>
        </TableContainer>
      </div>

      <EditModal open={open} handleClose={handleClose} file={selected} />
    </>
  );
}

export default ListView;
