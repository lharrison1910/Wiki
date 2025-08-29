import express from "express";
import fileUpload from "express-fileupload";
import { uploadFile, download } from "../modules/Nexus.js";
import { chunk } from "../modules/ChunkEmbed.js";
import { addEmbedding, addFile, fetchFiles } from "../modules/db.js";

export const fileRoute = express.Router();

const embed = async (filename) => {
  const embeddings = await chunk(filename);
  await addEmbedding(embeddings);
};

fileRoute.get("/", async (req, res) => {
  console.log("fetching files");

  const response = await fetchFiles({});
  console.log("fetched files");
  response.items.map((item) => (item.path = item.path.slice(9)));
  console.log("Files fetched:", response.items);
  res.json(response.items);
});

fileRoute.post("/upload", fileUpload(), async (req, res) => {
  try {
    const versions = await fetchFiles({
      "file.originalName": req.files.file.name,
    });
    const split = req.files.file.name.split(".");
    const result = await uploadFile(
      req.files.file,
      `${split[0]}_v${versions.items.length + 1}.${split[1]}`
    );

    const options = {
      file: {
        originalName: req.files.file.name,
        name: `${split[0]}_v${versions.items.length + 1}.${split[1]}`,
        size: req.files.file.size,
        mimetype: req.files.file.mimetype,
      },
      url: result.url,
      version: versions.items.length + 1,
    };

    const uploadResult = await addFile(options);
    res.status(200).json({ message: "File uploaded", url: result.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

fileRoute.get("/download", express.json(), async (req, res) => {
  const url = req.body.url;
  try {
    const file = await download(url);
    console.log(file, "file");
    res.setHeader(
      "Content-Type",
      file.headers.get("content-type") || "application/pdf"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${file}"`);
    // Stream the file from Nexus to client
    await pipeline(file.body, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

fileRoute.delete("/delete", express.json(), async (req, res) => {
  //this needs worked out to get the id of the nexus file.
});
