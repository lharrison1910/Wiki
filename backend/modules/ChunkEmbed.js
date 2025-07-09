import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embed } from "./LLM.js";

async function chunk(filepath) {
  const loader = new PDFLoader("../uploads/NIP.pdf");
  const data = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 20,
  });

  const docs = await splitter.splitDocuments(data);

  const embeddings = [];

  for (let i = 0; i < docs.length; i++) {
    const embeddingData = await embed(docs[i].pageContent);
    embeddings.push({ docInfo: docs[i].metadata, embedding: embeddingData });
  }
  return embeddings;
}
export default chunk;
