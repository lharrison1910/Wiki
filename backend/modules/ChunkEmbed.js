import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { embed } from "./LLM.js";

export const chunk = async (document) => {
  const response = await fetch(
    `http://localhost:8081/repository/Files/uploads/${document}`
  ).then((res) => res.blob());

  const loader = new WebPDFLoader(response);
  const docs = await loader.load();
  let chunks = [];

  for (let i = 0; i < docs.length; i++) {
    const embedding = await embed(docs[i].pageContent.trim());
    console.log(`embed complete of chunk ${i}`);
    chunks.push({
      pageContent: docs[i].pageContent,
      loc: docs[i].metadata.loc,
      embeddings: embedding.embeddings[0],
    });
  }

  console.log("All chunks embedded");
  return chunks;
};
