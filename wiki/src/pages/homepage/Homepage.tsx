// import { useState } from "react";
// import { Alert, Autocomplete, Button, styled, TextField } from "@mui/material";
// import type { FileProps } from "../../types/FileType";
// import ListView from "../../components/ListView/ListView";
// import CardView from "../../components/CardView/CardView";
// import { AttachFile } from "@mui/icons-material";
// import { useData } from "../../context/dataContext";
// import AI from "../../components/AIPopup/AI";
// import EditModal from "../../components/EditPopup/EditModel";
// import "./homepage.css";

// function Homepage(props: { display: string | undefined }) {
//   const {
//     data,
//     errorMsg,
//     successMsg,
//     setErrorMsg,
//     setSuccessMsg,
//     removeData,
//     addData,
//   } = useData();

//   const display = props.display;

//   // const [data, setData] = useState<FileProps[]>([]);
//   const [filter, setFilter] = useState<FileProps[] | null>(null);
//   const [open, isOpen] = useState(false);
//   const [selected, setSelected] = useState<FileProps>({
//     _id: "",
//     filename: "",
//     size: 0,
//   });

//   const handleDelete = (id: string) => {
//     removeData(id);
//     setFilter(null);
//   };

//   const handleClose = () => {
//     isOpen(false);
//   };

//   return (
//     <>
//         {display === "list" ? (
//           <ListView
//             data={filter === null ? data : filter}
//             handleDelete={handleDelete}
//             setSelected={setSelected}
//             isOpen={isOpen}
//           />
//         ) : (
//           <CardView
//             data={filter === null ? data : filter}
//             handleDelete={handleDelete}
//             setSelected={setSelected}
//             isOpen={isOpen}
//           />
//         )}

//         <EditModal open={open} handleClose={handleClose} file={selected} />
//       </div>
//       <div className="AI">
//         <AI />
//       </div>

//
//     </>
//   );
// }

// export default Homepage;

import { useEffect, useState } from "react";
import { addFile, fetchFiles } from "../../utils/crud/crud";
import type { FileType } from "../../types/FileType";
import { Alert, Autocomplete, Button, styled, TextField } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import TableView from "../../components/TableView/TableView";

import "./homepage.css";

function Homepage() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [filter, setFilter] = useState<FileType[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
      setFiles(await fetchFiles());
    };
    fetchData();
  }, []);

  const handleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFile(event.target.files[0], setErrorMsg, setSuccessMsg);
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
          sx={{ width: 1 / 2, bgcolor: "white", borderRadius: 6 }}
          disablePortal
          onChange={(_event, newValue) => handleFilter(newValue)}
          options={files.map((file: FileType) => file.path)}
          renderInput={(params) => (
            <TextField {...params} label="Search" placeholder="Search" />
          )}
        />

        <TableView files={filter != null ? filter : files} />

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
