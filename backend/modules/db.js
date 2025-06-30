import { MongoClient } from "mongodb";

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
      path: fileData.destination,
    };
    const result = await fileDB.insertOne(doc);
    return result;
  } catch (error) {
    return error;
  }
}

//Read
function fetchData() {
  try {
    const data = fileDB.find({});
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

//embedDB

//Create
async function addEmbed(id, embeddings) {
  const doc = {
    reference: id,
    embeddings: embeddings,
  };
  const result = await embedDB.insertOne(doc);
  return result;
}

//Read
function fetchEmbed(id) {
  const data = embedDB.find({});
}

export { addData, fetchData, updateData, deleteData, addEmbed };

// https://www.mongodb.com/docs/atlas/atlas-vector-search/rag/
