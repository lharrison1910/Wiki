export const uploadFile = async (file) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  const URL = `http://localhost:8081/repository/Files/${file.originalName}/${file.name}`;
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

export const download = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic YWRtaW46YWRtaW4=",
      },
    });
    if (!response.ok) {
      console.log(await response.text());
      return res.status(response.status).send("Failed to download from Nexus");
    }
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/pdf"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${file}"`);
    // Stream the file from Nexus to client
    await pipeline(response.body, res);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Error downloading file");
  }
};
