import { MongoClient } from "mongodb";
import { embed } from "./modules/LLM.js";

const URL =
  "mongodb+srv://lharrison06:2arayxxvqpBIVj2b@wiki.2fgyivp.mongodb.net/?authMechanism=SCRAM-SHA-1";
const client = new MongoClient(URL);
const database = client.db("Wiki");
const embeddingDB = database.collection("embeddingData");

const query = await embed("what are lambda expressions in c++");

const results = embeddingDB.aggregate([
  {
    $vectorSearch: {
      index: "vector_index",
      path: "embedding",
      queryVector: query.embeddings[0],
      numCandidates: 100,
      limit: 5,
    },
  },
]);

for await (const doc of results) {
  console.log(doc.content);
}
