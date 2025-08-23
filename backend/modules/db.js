import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const URL = process.env.MONGOSTRING_PROD;

const client = new MongoClient(URL);
const database = client.db("Wiki");
const fileDB = database.collection("FileData");
const embedDB = database.collection("embeddingData");

export const fetchFiles = async () => {
  try {
    const files = await fileDB.find({}).toArray();
    return { items: files };
  } catch (error) {
    console.error("Error fetching files:", error);
    return { error: "Failed to fetch files" };
  }
};

export const addFile = async (fileData) => {
  try {
    const result = await fileDB.insertOne(fileData);
    return result;
  } catch (error) {
    console.error("Error adding file:", error);
    return { error: "Failed to add file" };
  }
};

export const deleteFile = async (id) => {
  try {
    const query = { _id: new ObjectId(id) };
    const result = await fileDB.deleteOne(query);
    console.log(result);
    if (result.deletedCount === 1) {
      return true;
    } else {
      console.log(result);
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addEmbedding = async (embeddings) => {
  try {
    const result = await embedDB.insertMany(embeddings);
    if (result.insertedCount != embeddings.length) {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    return { error: "Failed to add embeddings" };
  }
};
