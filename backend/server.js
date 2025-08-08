import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { dbRoute } from "./routes/dbRoute.js";
//import { fileRoute } from "./routes/fileRoute.js";
import { LLMRoute } from "./routes/LLMRoute.js";
import { download, uploadFile } from "./modules/Nexus.js";
import { pipeline } from "stream";
import { promisify } from "util";
import { fileRoute } from "./routes/fileRoute.js";

const streamPipeline = promisify(pipeline);

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

//app.use("/api/files", dbRoute);

app.use("/api/LLM", LLMRoute);

app.use("/api/files", fileRoute);

//runs server
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
