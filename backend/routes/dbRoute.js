import express from "express";
import multer from "multer";
import fs from "fs";

import { fetchFiles, addFile, deleteFile } from "../modules/db.js";
import chunk from "../modules/ChunkEmbed.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export const dbRoute = express.Router();

dbRoute.get("/", async (req, res) => {
  const result = await fetchFiles();
  if (result.items) {
    console.log(result.items);
    res.send(result.items);
  } else {
    res.status(500).send("Error fetching data");
  }
});

dbRoute.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file.size < 16000000) {
    if (allowedTypes.includes(req.file.mimetype)) {
      const result = await addFile(req.file);
      if (result.insertedId) {
        chunk(`./uploads/${req.file.filename}`).catch((error) => {
          throw new Error(`Failed to chunk or embed: ${error}`);
        });
      }
      res.json(result);
    } else {
      fs.unlink(`./uploads/${req.file.filename}`, (error) =>
        console.log(error)
      );
      res.status(400).send("Invalid file type");
    }
  } else {
    res.status(400).send("File too big");
  }
});

dbRoute.get("/download/:file", async (req, res) => {
  try {
    const file = req.params.file;
    res.download(`./uploads/${file}`);
  } catch (error) {
    res.status(500).send("Error downloading file");
  }
});

dbRoute.delete("/delete", express.json(), async (req, res) => {
  const { id, filename } = req.body;
  try {
    const result = await deleteFile(id);
    if (result === true) {
      fs.unlink(`./uploads/${filename}`, (error) => {
        if (error) console.log(error);
      });
      res.status(200).send("Successful deletion");
    } else {
      throw new Error("Failed to delete file");
    }
  } catch (error) {
    res.status(500).send(`Error deleting file: ${error}`);
  }
});
