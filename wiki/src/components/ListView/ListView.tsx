import { MoreVert } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
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
import { useState, type MouseEvent } from "react";
import { useData } from "../../context/dataContext";

function ListView({ data, handleDelete, setSelected, isOpen }: ViewProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const TableHeader = [
    { header: "Name" },
    { header: "Size (kb)" },
    { header: "Actions" },
  ];
  const { setErrorMsg } = useData();

  const handleClick = (
    event: MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelected = (index: number) => {
    setSelected(data[index]);
    isOpen(true);
  };

  const handleDownload = async (filename: string) => {
    try {
      await fetch(`${client}/download/${filename}`).then((res) => {
        res.blob().then((blob) => {
          const fileURL = window.URL.createObjectURL(blob);
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = filename;
          alink.click();
        });
      });
    } catch (error: any) {
      setErrorMsg(error.message);
    }
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
                <>
                  <TableRow key={fd._id}>
                    <TableCell align="center">{fd.filename}</TableCell>
                    <TableCell align="center">{fd.size}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(event) => handleClick(event)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={() => handleSelected(index)}>
                      Open
                    </MenuItem>
                    <MenuItem onClick={() => handleDownload(fd.filename)}>
                      Download
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(fd._id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ListView;
