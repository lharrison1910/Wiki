//import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import type { FileProps } from "../../types/FileType";
import ListView from "../../components/ListView/ListView";
import CardView from "../../components/CardView/CardView";
import { AttachFile } from "@mui/icons-material";

//const pb = new PocketBase("http://192.168.1.3:8089");

function Homepage(props: { display: string }) {
  const display = props.display;
  const [data, setData] = useState<FileProps[]>([
    {
      id: "a string of characters",
      FileName: "File 1",
      Size: 100,
      lastModified: "2025/06/02",
      file: "aaaaaa",
    },
    {
      id: "a different string of characters",
      FileName: "File 2",
      Size: 250,
      lastModified: "2025/06/02",
      file: "bbbbbb",
    },
    {
      id: "sdafasdfters",
      FileName: "File 3",
      Size: 250,
      lastModified: "2025/06/02",
      file: "bbbbbb",
    },
    {
      id: "eeeee",
      FileName: "File 4",
      Size: 100,
      lastModified: "2025/06/02",
      file: "aaaaaa",
    },
    {
      id: "ffff",
      FileName: "File 5",
      Size: 250,
      lastModified: "2025/06/02",
      file: "bbbbbb",
    },
    {
      id: "sdfgsdfg",
      FileName: "File 6",
      Size: 250,
      lastModified: "2025/06/02",
      file: "bbbbbb",
    },
    {
      id: "tyuitym",
      FileName: "File 7",
      Size: 250,
      lastModified: "2025/06/02",
      file: "bbbbbb",
    },
  ]);
  const [filter, setFilter] = useState<FileProps[] | null>(null);

  //this relies on unique names, not a fan. need to find a way to use ID instead
  function handleFilter(newValue: string | null) {
    if (newValue !== null) {
      setFilter(data.filter((d) => d.FileName === newValue));
    } else {
      setFilter(null);
    }
  }

  function handleDelete(id: string) {
    setData(data.filter((d) => d.id != id));
    setFilter(null);
  }

  // async function fetchAll() {
  //   try {
  //     const records = await pb.collection("Wiki").getFullList();
  //     console.log(records);
  //     setData(records);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchAll();
  // }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-4">
        <Autocomplete
          sx={{ width: 1 / 2, bgcolor: "white", borderRadius: 6 }}
          disablePortal
          onChange={(_event, newValue) => handleFilter(newValue)}
          options={data.map((d) => d.FileName)}
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

        <Button variant="contained" endIcon={<AttachFile />}>
          Add new File
        </Button>
      </div>
    </>
  );
}

export default Homepage;
