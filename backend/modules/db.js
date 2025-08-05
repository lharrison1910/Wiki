//
// import chunk from "./ChunkEmbed.js";

//

// const URL = process.env.MONGOSTRING;
// if (!URL) {
//   throw new Error("MONGOSTRING environment variable is not set");
// }
// const client = new MongoClient(URL);
// const database = client.db("Wiki");

// const embeddingDB = database.collection("embeddingData");
// //fileDB stuff

// //Create
// async function addData(fileData) {
//   try {
//     const headers = new Headers();
//     headers.append("Authorization", `Basic YWRtaW46YWRtaW4=`);
//     const formData = new FormData();
//     formData.append("file", fileData);

//     const result = await fetch(
//       `http://localhost:8081/repisitory/Files/${fileData.originalname}`,
//       {
//         method: "POST",
//         headers: headers,
//         body: formData,
//       }
//     );
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return { error: "Failed to upload file" };
//   }
// }

// //Read
// async function fetchData() {
//   try {
//     const result = await fetch(
//       `http://localhost:8081/service/rest/v1/assets?repository=Files`
//     );
//     return await result.json();
//   } catch (error) {
//     return error;
//   }
// }

// //Update
// async function updateData() {
//   // try {
//   //   const result = await fileDB.replaceOne(id, fileData);
//   //   console.log(result);
//   //   return result;
//   // } catch (error) {
//   //   return error;
//   // }
// }

// //Delete
// async function deleteData(id) {
//   try {
//     const result = await fetch(
//       `http://localhost:8081/service/rest/v1/assets/${id}`
//     );
//     return await result.json();
//   } catch (error) {
//     return error;
//   }
// }

// export { addData, fetchData, updateData, deleteData };

// // https://www.youtube.com/watch?v=JEBDfGqrAUA

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

//const URL = process.env.MONGOSTRING;
const URL =
  "mongodb+srv://lharrison06:2arayxxvqpBIVj2b@wiki.2fgyivp.mongodb.net/?authMechanism=SCRAM-SHA-1";

const client = new MongoClient(URL);
const database = client.db("Wiki");
const fileDB = database.collection("FileData");

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
