import { useEffect, useState } from "react";
import { addFile, fetchFiles } from "../../utils/crud/crud";
import type { FileType } from "../../types/FileType";
import { Alert, Autocomplete, Button, styled, TextField } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import TableView from "../../components/TableView/TableView";

import "./homepage.css";
//import AI from "../../components/AIPopup/AI";

function Homepage() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [filter, setFilter] = useState<FileType[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFiles();
      if (typeof response != "string") {
        setFiles(response);
      }
    };
    fetchData();
  }, [hasChanged]);

  const handleAdd = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      try {
        addFile(event.target.files[0], setErrorMsg, setSuccessMsg);
        setHasChanged(!hasChanged);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFilter = (newValue: string | null) => {
    if (newValue !== null) {
      setFilter(
        files.filter((file: { path: string }) => file.path === newValue)
      );
    } else {
      setFilter(null);
    }
  };

  return (
    <>
      <div className="homepage">
        <Autocomplete
          sx={{ width: 1 / 2, borderRadius: 6 }}
          disablePortal
          onChange={(_event, newValue) => handleFilter(newValue)}
          options={files.map((file: FileType) => file.path)}
          renderInput={(params) => (
            <TextField {...params} label="Search" placeholder="Search" />
          )}
        />

        <TableView
          files={filter != null ? filter : files}
          setHasChanged={setHasChanged}
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          endIcon={<AttachFile />}
          sx={{ margin: 2, width: 1 / 2, borderRadius: 6, bgcolor: "green" }}
        >
          New File
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleAdd(event)}
          />
        </Button>
        {/* 
        <div>
          <AI />
        </div> */}
        {/*Feedback*/}
        <div>
          {errorMsg != null ? (
            <Alert severity="error" onClose={() => setErrorMsg(null)}>
              {errorMsg}
            </Alert>
          ) : null}
          {successMsg != null ? (
            <Alert severity="success" onClose={() => setSuccessMsg(null)}>
              {successMsg}
            </Alert>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Homepage;
