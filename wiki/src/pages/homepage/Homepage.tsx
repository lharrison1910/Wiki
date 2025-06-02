import PocketBase from "pocketbase";
import { Autocomplete, TextField } from "@mui/material";
import ListView from "../../components/ListView/ListView";
import { useEffect, useState } from "react";
import type { FileProps } from "../../types/FileType";

const pb = new PocketBase("http://192.168.1.3:8089");

function Homepage() {
  const [data, setData] = useState<FileProps[]>([
    {
      id: "a string of characters",
      name: "File 1",
      size: 100,
      lastModified: "2025/06/02",
      file: "aaaaaa",
    },
    {
      id: "a different string of characters",
      name: "File 2",
      size: 250,
      lastModified: "2025/06/02",
      file: "bbbbbb",
    },
    {
      id: "sdafasdfters",
      name: "File 3",
      size: 250,
      lastModified: "2025/06/02",
      file: "bbbbbb",
    },
  ]);

  const [filter, setFilter] = useState<FileProps[] | null>(null);

  //this relies on unique names, not a fan. need to find a way to use ID instead
  function handleFilter(newValue: string | null) {
    if (newValue !== null) {
      setFilter(data.filter((d) => d.name === newValue));
    } else {
      setFilter(null);
    }
  }

  function handleDelete(id: string) {
    setData(data.filter((d) => d.id != id));
    setFilter(null);
  }

  async function fetchAll() {
    try {
      const records = await pb.collection("Wiki").getFullList();
      console.log(records);
      setData(records);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-4">
        <Autocomplete
          sx={{ width: 1 / 2, bgcolor: "white", borderRadius: 6 }}
          disablePortal
          onChange={(_event, newValue) => handleFilter(newValue)}
          options={data.map((d) => d.name)}
          renderInput={(params) => (
            <TextField {...params} label="Search" placeholder="Search" />
          )}
        />
        <ListView
          data={filter === null ? data : filter}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default Homepage;
