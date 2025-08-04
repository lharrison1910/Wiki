import express from "express";
import multer from "multer";

import { fetchData, addData, updateData, deleteData } from "../modules/db.js";

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
  const result = await fetchData();
  if (result.items) {
    res.send(result.items);
  } else {
    res.status(500).send("Error fetching data");
  }
});

dbRoute.post("/post", upload.single("file"), async (req, res) => {
  if (req.file.size < 16000000) {
    if (allowedTypes.includes(req.file.mimetype)) {
      const result = await addData(req.file);
      res.json(result);
    } else {
      res.status(400).send("Invalid file type");
    }
  } else {
    res.status(400).send("File too big");
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
