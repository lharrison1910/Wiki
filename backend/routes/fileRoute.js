import express from "express";
import fileUpload from "express-fileupload";

export const fileRoute = express.Router();

fileRoute.get("/", async (req, res) => {
  const response = await fetch(
    "http://localhost:8081/service/rest/v1/assets?repository=Files"
  ).then((res) => res.json());
  console.log("Files fetched:", response.items);
  res.json(response.items);
});

fileRoute.post("/upload", fileUpload(), async (req, res) => {
  try {
    console.log(req.files.file);
    const formData = new FormData();
    formData.append("file", req.files.file);

    const headers = new Headers();
    headers.append("Authorization", "Basic YWRtaW46YWRtaW4=");
    await fetch(
      `http://localhost:8081/repository/Files/${req.files.file.name}`,
      {
        method: "PUT",
        headers: headers,
        body: formData,
      }
    )
      .then((res) => res.text())
      .catch((error) => {
        console.log(error);
        throw new Error(`Error uploading file: ${error}`);
      });
    console.log("successful upload");
    res.send("Successful upload");
  } catch (error) {
    console.log(error);
    res.send(`Error uploading file: ${error}`);
  }
});

fileRoute.delete("/delete", express.json(), async (req, res) => {
  const id = req.body.id;
  const response = await fetch(
    `http://localhost:8081/service/rest/v1/assets/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Basic YWRtaW46YWRtaW4=",
      },
    }
  ).catch((error) => {
    console.error("Error deleting file:", error);
  });
  if (response.status === 204) {
    res.status(200).send("File deleted successfully");
  }
  res.status(500).send("Error deleting file");
});
