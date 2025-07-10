import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chunk from "./ChunkEmbed.js";

dotenv.config();

const URL = process.env.MONGOSTRING;
const client = new MongoClient(URL);
const database = client.db("Wiki");
const fileDB = database.collection("FileData");
const embeddingDB = database.collection("embeddingData");
//fileDB stuff

//Create
async function addData(fileData) {
  try {
    const fileResult = await fileDB.insertOne(fileData);
    const docs = await chunk(fileData.path);
    const embedResult = [];
    docs.map(async (doc) => {
      const temp = {
        refernce: fileResult.insertedId,
        content: doc.pageContent,
        embedding: doc.embedding,
      };
      embedResult.push(await embeddingDB.insertOne(temp));
    });
    const result = { fileResult, embedResult };
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

    console.log(result);
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

    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
}

//Delete
async function deleteData(id) {
  try {
    const result = await fileDB.deleteOne({ _id: id });
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
}

export { addData, fetchData, updateData, deleteData };

// https://www.youtube.com/watch?v=JEBDfGqrAUA
