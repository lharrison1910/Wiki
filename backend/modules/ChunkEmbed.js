import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embed } from "./LLM.js";

async function chunk(filepath) {
  const loader = new PDFLoader(filepath);
  const data = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 20,
  });

  const docs = await splitter.splitDocuments(data);
  //send each chunk individually to getembeddings

  const embeddings = docs.forEach(async (doc) => {
    return await embed(doc.pageContent);
  });

  return embeddings;
}

export default chunk;
