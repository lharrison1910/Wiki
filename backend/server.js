import express from "express";
import { MongoClient } from "mongodb";

// server setup
const app = express();
const PORT = 5050;
app.use(express.json());

//db connections
const URL = "mongodb://localhost:27017/";
const client = new MongoClient(URL);
const db = client.db("WikiDB");
const fileDB = db.collection("fileDB");

// db test
async function dbTest() {
  try {
    await client.connect();

    await client.db("WikiDB").command({ ping: 1 });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
dbTest();

//test the server is on
app.get("/", (_req, res) => {
  res.send("test");
});

//CRUD operations

//fetch all data
app.get("/files", async (_req, res) => {
  try {
    const data = await fileDB.find({});
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//post new data
app.post("/files/post", async (req, res) => {
  try {
    const result = await fileDB.insertOne(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//update old data
app.patch("/files/patch", async (req, res) => {
  try {
    //save the file to path
    const path = "";
    const id = req.body._id;
    const updateDoc = {
      name: req.body.name,
      size: req.body.size,
      lastModified: req.body.lastModified,
      path: path,
    };
    const result = await fileDB.replaceOne(id, updateDoc);

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/files/delete", async (req, res) => {
  try {
    const result = await fileDB.deleteOne({ _id: req.body._id });
    if (result.deletedCount === 1) {
      res.send(result);
    } else {
      res.send("failed to delete");
    }
  } catch (error) {
    console.log(error);
  }
});

//runs server
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
