import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import "./App.css";

import { useEffect, useState } from "react";
import { fetchFiles } from "./utils/crud/crud";
import { Alert } from "@mui/material";

function App() {
  const [files, setFiles] = useState();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [successMsg, setsuccessMsg] = useState<null | string>(null);

  useEffect(() => {
    fetchFiles()
      .then((res) => setFiles(res))
      .catch((err) => setErrorMsg(`Something went wrong: ${err}`));
  }, []);

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="homepage">
        <Homepage files={files} />
      </div>
      <div className="alert">
        {errorMsg !== null ? (
          <Alert severity="error" onClose={() => setErrorMsg(null)}>
            {errorMsg}
          </Alert>
        ) : null}
        {successMsg !== null ? (
          <Alert severity="success" onClose={() => setsuccessMsg(null)}>
            {successMsg}
          </Alert>
        ) : null}
      </div>
    </>
  );
}

export default App;
