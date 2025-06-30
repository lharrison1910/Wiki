import express from "express";
import cors from "cors";
import multer from "multer";
import { MongoClient } from "mongodb";

// server setup
const app = express();
const PORT = 5050;
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

//db connections
const URL = "mongodb://localhost:27017/";
const client = new MongoClient(URL);
const db = client.db("WikiDB");
const fileDB = db.collection("fileDB");

//test the server is on
app.get("/", (_req, res) => {
  res.send("test");
});

//CRUD operations

//fetch all data
app.get("/api", async (_req, res) => {
  try {
    const data = fileDB.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//post new data
app.post("/api/post", upload.single("file"), async (req, res) => {
  try {
    const doc = {
      name: req.file.originalname,
      size: req.file.size,
      lastModified: req.file.lastModified,
      path: req.file.destination,
    };
    const result = await fileDB.insertOne(doc);
  } catch (error) {
    res.json(error);
  }
  res.send("successful upload");
});

//update old data
app.post("/api/patch", upload.single("file"), async (req, res) => {
  const replacement = {
    name: req.file.originalname,
    size: req.file.size,
    lastModified: req.file.lastModified,
    path: req.file.destination,
  };

  const result = await fileDB.replaceOne(req.query.id, replacement);
  res.json(result);
});

app.delete("/api/delete", async (req, res) => {
  try {
    const result = await fileDB.deleteOne({ _id: req.query.id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

//runs server
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
