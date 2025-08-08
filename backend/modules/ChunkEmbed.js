import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embed } from "./LLM.js";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

// async function chunk(filepath) {
//   console.log("loading file....");
//   let loader = null;
//   if (filepath.includes(".pdf")) {
//     loader = new PDFLoader(`./${filepath}`);
//   } else if (filepath.includes(".docx")) {
//     loader = new DocxLoader(`./${filepath}`);
//   } else {
//     loader = new DocxLoader(`./${filepath}`, {
//       type: "doc",
//     });
//   }

//   const data = await loader.load();
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 100,
//   });

//   console.log("splitting doc");
//   const docs = await splitter.splitDocuments(data);

//   const chunks = [];

//   for (let i = 0; i < docs.length; i++) {
//     const embedding = await embed(docs[i].pageContent);
//     console.log(`embed complete of chunk ${i}`);
//     const doc = {
//       pageContent: docs[i].pageContent,
//       embedding: embedding.embeddings[0],
//     };

//     chunks.push(doc);
//   }

//   return chunks;
// }
// export default chunk;

export const chunk = async (document) => {
  const response = await fetch(
    `http://localhost:8081/repository/Files/uploads/${document}`
  ).then((res) => res.blob());

  const loader = new WebPDFLoader(response);

  const docs = await loader.load().catch((error) => console.log(error));
  let chunks = [];
  docs.map(async (doc, index) => {
    const embedding = await embed(doc.pageContent);
    console.log(`embed complete of chunk ${index}`);
    chunks.push(doc.pageContent, doc.metadata, doc.loc.pageNumber, embedding);
  });

  console.log("Embedding complete");
  return chunks;
};
