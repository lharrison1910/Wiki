import express from "express";
import multer from "multer";

import { fetchData } from "../modules/db.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ".\\uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

export const dbRoute = express.Router();

dbRoute.get("/", async (req, res) => {
  const result = await fetchData();
  res.send(result);
});

dbRoute.post("/post", upload.single("file"), async (req, res) => {
  const result = await addData(req.file);
  res.json(result);
});

dbRoute.post("/patch", upload.single("file"), async (req, res) => {
  res.json(updateData(req.query.id, req.file));
});

dbRoute.delete("/api/delete", async (req, res) => {
  res.json(deleteData(req.query.id));
});
