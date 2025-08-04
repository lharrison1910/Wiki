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

function TableView(props: { files: any }) {
  let files = props.files;
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <>
      <Table sx={{ width: 2 / 3, bgcolor: "white", margin: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Size (Bytes)</TableCell>
            <TableCell align="center">Last Modified</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file: any) => (
            <TableRow key={file.id}>
              <TableCell align="center">{file.path}</TableCell>
              <TableCell align="center">{file.fileSize}</TableCell>
              <TableCell align="center">{file.lastModified}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => setOpenMenu(true)}>
                  <MenuIcon />
                  <Menu open={openMenu} onClose={() => setOpenMenu(false)}>
                    <MenuItem>
                      <FileOpen /> View
                    </MenuItem>
                    <MenuItem onClick={() => download(file.downloadUrl)}>
                      <Download color="success" />
                      Download
                    </MenuItem>
                    <MenuItem onClick={() => deleteFile(file.id)}>
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
