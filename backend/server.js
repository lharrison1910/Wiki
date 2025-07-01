import express from "express";
import cors from "cors";
import multer from "multer";
import {
  addData,
  deleteData,
  fetchData,
  getCollect,
  updateData,
} from "./modules/db.js";
import { chat } from "./modules/LLM.js";

// server setup
const app = express();
const PORT = 3000;
app.use(cors());

//multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ".\\backend\\uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//test the server is on
app.get("/", (_req, res) => {
  getCollect();
  res.send("test");
});

//CRUD operations

//fetch all data
app.get("/api", async (_req, res) => {
  res.json(fetchData());
});

//post new data
app.post("/api/post", upload.single("file"), async (req, res) => {
  res.json(addData(req.file));
});

//update old data
app.post("/api/patch", upload.single("file"), async (req, res) => {
  res.json(updateData(req.query.id, req.file));
});

app.delete("/api/delete", async (req, res) => {
  res.json(deleteData(req.query.id));
});

app.post("/api/chat", express.json(), async (req, res) => {
  const response = await chat(req.body.text);
  res.json(response);
});

//runs server
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
