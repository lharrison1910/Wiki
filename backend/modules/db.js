import { MongoClient } from "mongodb";
import chunk from "./ChunkEmbed.js";

const URL = "mongodb://localhost:27017/";
const client = new MongoClient(URL);
const db = client.db("WikiDB");
const fileDB = db.collection("fileDB");
const embedDB = db.collection("embedDB");

//fileDB stuff

//Create
async function addData(fileData) {
  try {
    const doc = {
      name: fileData.originalname,
      size: fileData.size,
      lastModified: fileData.lastModified,
      path: fileData.path,
    };
    const result = await fileDB.insertOne(doc);
    const embeddings = await chunk(fileData.path);
    const embedDoc = {
      reference: result.insertedId,
      embeddings: embeddings,
    };
    const embedResult = await embedDB.insertOne(embedDoc);

    return;
  } catch (error) {
    return error;
  }
}

//Read
function fetchData() {
  try {
    const data = fileDB.find({});
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

//Update
async function updateData(id, fileData) {
  try {
    const replacement = {
      name: fileData.originalname,
      size: fileData.size,
      lastModified: fileData.lastModified,
      path: fileData.destination,
    };
    const result = await fileDB.replaceOne(id, replacement);
    return result;
  } catch (error) {
    return error;
  }
}

//Delete
async function deleteData(id) {
  try {
    const result = await fileDB.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

export { addData, fetchData, updateData, deleteData };

// https://www.mongodb.com/docs/atlas/atlas-vector-search/rag/
