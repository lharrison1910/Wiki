import express from "express";
import cors from "cors";
import multer from "multer";
import { addData, deleteData, fetchData, updateData } from "./modules/db.js";
import { chat } from "./modules/LLM.js";

// server setup
const app = express();
const PORT = 3000;
app.use(cors());

//multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

//test the server is on
app.get("/", (_req, res) => {
  res.send("test");
});

//CRUD operations

//fetch all data
app.get("/api", async (_req, res) => {
  res.json(fetchData());
});

//post new data
app.post("/api/post", upload.single("file"), async (req, res) => {
  const result = await addData(req.file);
  res.json(result);
});

//update old data
app.post("/api/patch", upload.single("file"), async (req, res) => {
  res.json(updateData(req.query.id, req.file));
});

app.delete("/api/delete", async (req, res) => {
  res.json(deleteData(req.query.id));
});

app.post("/api/chat", async (req, res) => {
  const response = await chat(req.body.text);
  console.log(response);
  res.json(response);
});

//runs server
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
