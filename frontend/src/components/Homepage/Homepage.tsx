import { Autocomplete, TextField } from "@mui/material";

const Homepage = (files) => {
  const fileData = files.files;
  console.log(files.files);
  return (
    <>
      <Autocomplete
        options={fileData.map((file) => file.path)}
        renderInput={(params) => (
          <TextField {...params} label="Search" placeholder="Search" />
        )}
      />
    </>
  );
};

export default Homepage;
