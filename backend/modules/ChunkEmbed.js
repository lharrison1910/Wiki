import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embed } from "./LLM.js";

async function chunk(filepath) {
  console.log("loading file....");
  const loader = new PDFLoader(filepath);
  const data = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10000,
    chunkOverlap: 2500,
  });

  console.log("splitting doc");
  const docs = await splitter.splitDocuments(data);

  const chunks = [];

  for (let i = 0; i < docs.length; i++) {
    const embedding = await embed(docs[i].pageContent);
    console.log(`embed complete of chunk ${i}`);
    const doc = {
      pageContent: docs[i].pageContent,
      embedding: embedding.embeddings[0],
    };

    chunks.push(doc);
  }

  return chunks;
}
export default chunk;
