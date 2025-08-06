import express from "express";
import cors from "cors";

import { dbRoute } from "./routes/dbRoute.js";
//import { fileRoute } from "./routes/fileRoute.js";
import { LLMRoute } from "./routes/LLMRoute.js";

// server setup
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
//test the server is on
app.get("/", (_req, res) => {
  res.send(1);
});

//app.use("/api/files", fileRoute);

app.use("/api/files", dbRoute);

app.use("/api/LLM", LLMRoute);

app.post("/test", express.json(), (req, res) => {
  console.log(req.body);
});

//runs server
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
