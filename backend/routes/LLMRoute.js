import express from "express";
import { querySearch } from "../modules/VectorSearch.js";
import chat from "../modules/LLM.js";

export const LLMRoute = express.Router();

LLMRoute.post("/chat", express.json(), async (req, res) => {
  try {
    const vectorResponse = await querySearch(req.body.query);
    const prompt = `You are to answer this question: ${req.body.query} based off this context ${vectorResponse}`;
    const response = await chat(prompt);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});
