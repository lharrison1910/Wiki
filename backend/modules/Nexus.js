export const uploadFile = async (fileData, newName) => {
  if (!fileData) {
    throw new Error("No file uploaded");
  }

  const URL = `http://localhost:8081/repository/Files/${fileData.name}/${newName}`;
  const username = "admin";
  const password = "admin";

  console.log("Starting upload");
  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": fileData.mimetype,
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    },
    body: fileData.data,
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

export const download = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic YWRtaW46YWRtaW4=",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (err) {
    console.error("Download error:", err);
    throw new Error(`Download failed: ${err.message}`);
  }
};
