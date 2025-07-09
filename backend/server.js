import express from "express";
import cors from "cors";

import { dbRoute } from "./routes/dbRoute.js";

// server setup
const app = express();
const PORT = 3000;
app.use(cors());

//multer setup

//test the server is on
app.get("/", (_req, res) => {
  res.send(1);
});

//CRUD operations
app.use("/api/db", dbRoute);

app.post("/api/chat", express.json(), async (req, res) => {
  const response = await chat(req.body.text);
  res.json(response);
});

app.get("/api/download/:file", async (req, res) => {
  const file = req.params.file;
  console.log(file);
  res.download(`./uploads/${file}`);
});
// backend / uploads / requiremens.txt;

//runs server
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
