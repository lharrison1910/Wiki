import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { embed } from "./LLM.js";

export const querySearch = async (query) => {
  dotenv.config();
  const URL = process.env.MONGOSTRING;
  const client = new MongoClient(URL);
  const database = client.db("Wiki");
  const embeddingDB = database.collection("embeddingData");

  const embeddedQuery = await embed(query);

  const results = embeddingDB.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: embeddedQuery.embeddings[0],
        numCandidates: 100,
        limit: 5,
      },
    },
  ]);

  const response = [];
  for await (const doc of results) {
    response.push(doc.content);
  }

  return response;
};
