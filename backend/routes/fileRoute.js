import express from "express";

export const fileRoute = express.Router();

fileRoute.get("/", async (req, res) => {
  const response = await fetch(
    "http://localhost:8081/service/rest/v1/assets?repository=Files"
  ).then((res) => res.json());
  console.log("Files fetched:", response.items);
  res.json(response.items);
});

// fileRoute.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     console.log(req.file.buffer, "buffer");
//     // const fileData = new File([req.file.buffer])
//     //nexusUpload(fileData);
//     res.status(200).send("File uploaded successfully");
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return res.status(500).send("Error uploading file");
//   }
// });

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
