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
import { client } from "../../utils/client/client";
import type { ViewProps } from "../../types/ViewProps";

import "./ListView.css";

function ListView({ data, handleDelete, setSelected, isOpen }: ViewProps) {
  const TableHeader = [
    { header: "Name" },
    { header: "Size (kb)" },
    { header: "Last Modified" },
    { header: "Edit" },
    { header: "Download" },
    { header: "Delete" },
  ];

  const handleSelected = (index: number) => {
    setSelected(data[index]);
    isOpen(true);
  };

  const handleDownload = async (name: string) => {
    await fetch(`${client}/download/${name}`).then((res) => {
      res.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Sample.pdf";
        alink.click();
      });
    });
  };

  return (
    <>
      <div className="ListView">
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
                  <TableCell align="center">{fd.Name}</TableCell>
                  <TableCell align="center">{fd.Size}</TableCell>
                  <TableCell align="center">{fd.lastModified}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleSelected(index)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDownload(fd.Name)}>
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
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ListView;
