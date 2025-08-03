import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chunk from "./ChunkEmbed.js";

dotenv.config();

const URL = process.env.MONGOSTRING;
if (!URL) {
  throw new Error("MONGOSTRING environment variable is not set");
}
const client = new MongoClient(URL);
const database = client.db("Wiki");

const embeddingDB = database.collection("embeddingData");
//fileDB stuff

//Create
async function addData(fileData) {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Basic YWRtaW46YWRtaW4=`);
    const formData = new FormData();
    formData.append("file", fileData);

    const result = await fetch(
      `http://localhost:8081/repisitory/Files/${fileData.originalname}`,
      {
        method: "POST",
        headers: headers,
        body: formData,
      }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: "Failed to upload file" };
  }
}

//Read
async function fetchData() {
  try {
    const result = await fetch(
      `http://localhost:8081/service/rest/v1/assets?repository=Files`
    );
    return await result.json();
  } catch (error) {
    return error;
  }
}

//Update
async function updateData() {
  // try {
  //   const result = await fileDB.replaceOne(id, fileData);
  //   console.log(result);
  //   return result;
  // } catch (error) {
  //   return error;
  // }
}

//Delete
async function deleteData(id) {
  try {
    const result = await fetch(
      `http://localhost:8081/service/rest/v1/assets/${id}`
    );
    return await result.json();
  } catch (error) {
    return error;
  }
}

export { addData, fetchData, updateData, deleteData };

// https://www.youtube.com/watch?v=JEBDfGqrAUA
