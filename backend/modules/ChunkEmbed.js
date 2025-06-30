import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

async function getEmbeddings(chunks) {
  const response = await fetch("http://localhost:11434/api/embed", {
    method: "post",
    body: JSON.stringify({ model: "llama3.2", input: chunks }),
  });

  if (!response.ok) {
    console.log(`something went wrong: ${response.statusText}`);
    return;
  }

  const json = await response.json();
  return json;
}

async function chunk(filepath) {
  if (filepath.includes(".pdf")) {
    const loader = new PDFLoader(filepath);
    const data = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 400,
      chunkOverlap: 20,
    });

    const docs = await splitter.splitDocuments(data);
    console.log(docs);
  }
}

export default chunk;
