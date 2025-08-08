export const uploadFile = async (fileData) => {
  const file = fileData?.file;

  if (!file) {
    throw new Error("No file uploaded");
  }

  const URL = `http://localhost:8081/repository/Files/uploads/${file.name}`;
  const username = "admin";
  const password = "admin";

  console.log("Starting upload");
  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": file.mimetype,
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    },
    body: file.data,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Upload failed:", response.status, text);
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  console.log(`Uploaded to Nexus at: ${URL}`);
  return {
    url: URL,
    status: response.status,
  };
};

export const download = async (filename) => {
  const result = await fetch(
    `http://localhost:8081/repository/Files/${filename}`,
    {
      headers: {
        Authorization: "Basic YWRtaW46YWRtaW4=",
      },
    }
  );

  const blob = await result.blob();
  const file = new File([blob], filename, { type: blob.type });

  return file;
};
