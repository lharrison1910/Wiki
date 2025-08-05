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
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Delete, Download, FileOpen } from "@mui/icons-material";
import { download } from "../../utils/download/download";
import { deleteFile } from "../../utils/crud/crud";
import type { FileType } from "../../types/FileType";
import { View } from "../../utils/View/view";

function TableView(props: { files: FileType[] }) {
  const files = props.files;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Table sx={{ width: 2 / 3, bgcolor: "white", margin: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Size (Bytes)</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file: FileType) => (
            <TableRow key={file._id}>
              <TableCell align="center">{file.filename}</TableCell>
              <TableCell align="center">{file.size}</TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <MenuIcon />
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
                        View(file.filename);
                      }}
                    >
                      <FileOpen /> Open
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        download(file.filename);
                      }}
                    >
                      <Download color="success" />
                      Download
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        deleteFile(file._id);
                      }}
                    >
                      <Delete color="error" />
                      Delete
                    </MenuItem>
                  </Menu>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default TableView;
