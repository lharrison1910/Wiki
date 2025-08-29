const URL = "http://localhost:3000/api";
const FILEURL = `${URL}/files`;

export const fetchFiles = async () => {
  try {
    const response = await fetch(FILEURL)
      .then((res) => res.json())
      .catch((err) => {
        console.error("Fetch error:", err);
        throw err;
      });
    return response;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};
