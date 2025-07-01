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
  const response = await ollama.embed({
    modal: "llama3.2",
    input: chunk,
  });

  console.log(response);
}
