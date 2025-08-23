import ollama from "ollama";

export async function chat(message) {
  const response = await ollama.chat({
    model: "llama3.2",
    stream: false,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response;
}

export async function embed(chunk) {
  console.log("recieved chunk");
  const response = await ollama.embed({
    model: "nomic-embed-text",
    input: chunk,
  });
  return response;
}
