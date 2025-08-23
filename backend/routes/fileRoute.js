import express from "express";
import fileUpload from "express-fileupload";
import { uploadFile } from "../modules/Nexus.js";
import { pipeline } from "stream/promises";
import { chunk } from "../modules/ChunkEmbed.js";
import { addEmbedding, addFile, fetchFiles } from "../modules/db.js";
import { version } from "os";

export const fileRoute = express.Router();

const embed = async (filename) => {
  const embeddings = await chunk(filename);
  await addEmbedding(embeddings);
};

fileRoute.get("/", async (req, res) => {
  console.log("fetching files");
  const response = await fetch(
    "http://localhost:8081/service/rest/v1/assets?repository=Files",
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`admin:admin`).toString("base64")}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
  console.log("fetched files");
  response.items.map((item) => (item.path = item.path.slice(9)));
  console.log("Files fetched:", response.items);
  res.json(response.items);
});

fileRoute.post("/upload", fileUpload(), async (req, res) => {
  try {
    const versions = await fetchFiles({
      "fileData.name": req.files.file.name,
    });
    const split = req.files.file.name.split(".");
    const file = {
      originalName: req.files.file.name,
      name: `${split[0]}_v${versions.items.length + 1}.${split[1]}`,
      data: req.files.file.data,
      size: req.files.file.size,
      encoding: req.files.file.encoding,
      tempFilePath: req.files.file.tempFilePath,
      truncated: req.files.file.truncated,
      mimetype: req.files.file.mimetype,
      md5: req.files.file.md5,
      mv: req.files.file.mv,
    };
    const result = await uploadFile(file);
    const uploadResult = await addFile({
      fileData: req.files.file,
      url: result.url,
      version: versions.items.length + 1,
    });
    res.status(200).json({ message: "File uploaded", url: result.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

fileRoute.get("/download/", express.json(), async (req, res) => {
  const url = req.body.url;
  download(url);
});

fileRoute.delete("/delete", express.json(), async (req, res) => {
  const id = req.body.id;
  const response = await fetch(
    `http://Sonatype:8081/service/rest/v1/assets/${id}`,
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
