import express from "express";
import multer from "multer";
import fs from "fs";

import { fetchFiles, addFile, deleteFile } from "../modules/db.js";

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
      res.json(result);
    } else {
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
  console.log(req.body);
  const { id, filename } = req.body;
  try {
    const result = await deleteFile(req.file);
    if (result === true) {
      fs.unlink(`../uploads/${filename}`, (error) => {
        if (error) console.log(error);
      });
    } else {
      throw new Error("Failed to delete file");
    }
  } catch (error) {
    res.status(500).send(`Error deleting file: ${error}`);
  }
});

// dbRoute.post("/post", upload.single("file"), async (req, res) => {
//   if (req.file.size < 16000000) {
//     if (allowedTypes.includes(req.file.mimetype)) {
//       const result = await addData(req.file);
//       res.json(result);
//     }
//     res.send("invalid file type");
//   }
//   res.send("file too big");
// });

// dbRoute.post("/patch", upload.single("file"), async (req, res) => {
//   res.json(updateData(req.body.id, req.file));
// });

// dbRoute.delete("/delete", express.json(), async (req, res) => {
//   res.json(deleteData(req.body.id));
// });
