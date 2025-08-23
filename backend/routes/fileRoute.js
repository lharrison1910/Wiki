import express from "express";
import fileUpload from "express-fileupload";
import { uploadFile } from "../modules/Nexus.js";
import { pipeline } from "stream/promises";
import { chunk } from "../modules/ChunkEmbed.js";
import { addEmbedding } from "../modules/db.js";

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
    const result = await uploadFile(req.files);
    embed(req.files.file.name);
    res.status(200).json({ message: "File uploaded", url: result.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

fileRoute.get("/download/:file", async (req, res) => {
  const file = req.params.file;
  try {
    const response = await fetch(
      `http://Sonatype:8081/repository/Files/uploads/${file}`,
      {
        headers: {
          Authorization: "Basic YWRtaW46YWRtaW4=",
        },
      }
    );
    if (!response.ok) {
      console.log(await response.text());
      return res.status(response.status).send("Failed to download from Nexus");
    }
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/pdf"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${file}"`);
    // Stream the file from Nexus to client
    await pipeline(response.body, res);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Error downloading file");
  }
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
