import { MongoClient } from "mongodb";
import chunk from "./ChunkEmbed.js";

const URL = "mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT";
const client = new MongoClient(URL);
const database = client.db("WikiDB");
const fileDB = database.collection("fileData");
const embedDB = database.collection("embedings");

async function getCollect() {
  const collections = database.listCollections();
  for await (const doc of collections) {
    console.log(doc);
  }
}

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
    if (result.acknowledged) {
      const embeddings = await chunk(fileData.path);

      const embedDoc = {
        reference: result.insertedId,
        embeddings: embeddings,
      };

      //const embedResults = await embedDB.insertOne(embedDoc);
    }

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//Read
async function fetchData() {
  try {
    const result = [];
    for await (const doc of fileDB.find()) {
      result.push(doc);
    }
    return result;
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

export { addData, fetchData, updateData, deleteData, getCollect };

// https://www.mongodb.com/docs/atlas/atlas-vector-search/rag/
