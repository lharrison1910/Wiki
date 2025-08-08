import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { embed } from "./LLM.js";

export const chunk = async (document) => {
  const response = await fetch(
    `http://localhost:8081/repository/Files/uploads/${document}`
  ).then((res) => res.blob());

  const loader = new WebPDFLoader(response);
  const docs = await loader.load();
  let chunks = [];
  const chunk = await Promise.all(
    docs.map(async (doc, index) => {
      const embedding = await embed(doc.pageContent.trim());
      console.log(`embed complete of chunks ${index}`);
      return {
        pageContent: doc.pageContent,
        loc: doc.metadata.loc,
        embedding,
      };
    })
  );

  chunks.push(...chunk);
};
