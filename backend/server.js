import express from "express";
import cors from "cors";

import { dbRoute } from "./routes/dbRoute.js";
import { LLMRoute } from "./routes/LLMRoute.js";

// server setup
const app = express();
const PORT = 3000;
app.use(cors());

//test the server is on
app.get("/", (_req, res) => {
  res.send(1);
});

//CRUD operations
app.use("/api/db", dbRoute);

app.use("/api/LLM", LLMRoute);

app.get("/api/download/:file", async (req, res) => {
  const file = req.params.file;
  res.download(`./uploads/${file}`);
});

//runs server
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
