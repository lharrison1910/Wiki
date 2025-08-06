import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embed } from "./LLM.js";
import { addEmbeddings } from "./db.js";

async function chunk(filepath) {
  console.log("loading file....");

  //decides which loader to use
  let loader = null;
  if (filepath.includes(".pdf")) {
    loader = new PDFLoader(`./${filepath}`);
  } else if (filepath.includes(".docx")) {
    loader = new DocxLoader(`./${filepath}`);
  } else {
    loader = new DocxLoader(`./${filepath}`, {
      type: "doc",
    });
  }
  const data = await loader.load();

  //setting up the splitter
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
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

  await addEmbeddings(chunks);
}
export default chunk;
