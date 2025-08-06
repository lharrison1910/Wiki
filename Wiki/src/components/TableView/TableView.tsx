import {
  IconButton,
  Table,
  Menu,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Delete, Download, FileOpen, MoreVert } from "@mui/icons-material";
import { download } from "../../utils/download/download";
import { deleteFile } from "../../utils/crud/crud";
import type { FileType } from "../../types/FileType";
import { View } from "../../utils/View/view";

function TableView(props: {
  files: FileType[];
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const files = props.files;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<FileType>({
    destination: "",
    encoding: "",
    fieldname: "",
    filename: "",
    mimetype: "",
    originalname: "",
    path: "",
    size: 0,
    _id: "",
  });
  const open = Boolean(anchorEl);

  const handleSelect = (name: string) => {
    const filtered = files.filter((file) => file._id === name);
    setSelected(filtered[0]);
  };

  const headers = ["Name", "Size (Bytes)", "Actions"];

  return (
    <>
      <Table sx={{ width: 2 / 3, bgcolor: "white", margin: 4 }}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align="center" key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {files.map((file: FileType) => (
            <TableRow key={file._id}>
              <TableCell align="center">{file.filename}</TableCell>
              <TableCell align="center">{file.size}</TableCell>
              <TableCell align="center">
                <IconButton
                  name={file._id}
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    handleSelect(event.currentTarget.name);
                  }}
                >
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            View(selected.filename);
          }}
        >
          <FileOpen color="primary" /> Open
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            download(selected.filename);
          }}
        >
          <Download color="success" />
          Download
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            deleteFile(selected._id, selected.filename);
            props.setHasChanged(false);
          }}
        >
          <Delete color="error" />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default TableView;
