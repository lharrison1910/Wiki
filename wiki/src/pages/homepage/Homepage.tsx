import { useState } from "react";
import { Alert, Autocomplete, Button, styled, TextField } from "@mui/material";
import type { FileProps } from "../../types/FileType";
import ListView from "../../components/ListView/ListView";
import CardView from "../../components/CardView/CardView";
import { AttachFile } from "@mui/icons-material";
import { useData } from "../../context/dataContext";

function Homepage(props: { display: string | undefined }) {
  const {
    data,
    errorMsg,
    successMsg,
    setErrorMsg,
    setSuccessMsg,
    removeData,
    addData,
  } = useData();

  const display = props.display;
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

  // const [data, setData] = useState<FileProps[]>([]);
  const [filter, setFilter] = useState<FileProps[] | null>(null);

  //this relies on unique names, not a fan. need to find a way to use ID instead
  function handleFilter(newValue: string | null) {
    if (newValue !== null) {
      setFilter(
        data.filter((d: { FileName: string }) => d.FileName === newValue)
      );
    } else {
      setFilter(null);
    }
  }

  function handleDelete(id: string) {
    removeData(id);
    setFilter(null);
  }

  function handleAdd(event: any) {
    const newFile: FileProps = {
      id: "",
      FileName: event.target.files[0].name,
      Size: event.target.files[0].size,
      lastModified: event.target.files[0].lastModifiedDate.toString(),
      file: event.target.files[0],
    };
    addData(newFile);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-4">
        <Autocomplete
          sx={{ width: 1 / 2, bgcolor: "white", borderRadius: 6 }}
          disablePortal
          onChange={(_event, newValue) => handleFilter(newValue)}
          options={data.map((d: { FileName: string }) => d.FileName)}
          renderInput={(params) => (
            <TextField {...params} label="Search" placeholder="Search" />
          )}
        />
        {display === "list" ? (
          <ListView
            data={filter === null ? data : filter}
            handleDelete={handleDelete}
          />
        ) : (
          <CardView
            data={filter === null ? data : filter}
            handleDelete={handleDelete}
          />
        )}

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          endIcon={<AttachFile />}
        >
          upload file
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleAdd(event)}
          />
        </Button>
      </div>

      {/*feedback */}
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
    </>
  );
}

export default Homepage;
