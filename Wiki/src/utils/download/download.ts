export const download = async (downloadPath: string) => {
  try {
    await fetch(downloadPath)
      .then((res) => {
        res.blob().then((blob) => {
          const fileURL = window.URL.createObjectURL(blob);
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = downloadPath;
          alink.click();
        });
      })
      .catch((error) => {
        console.log(`Error downloading file: ${error}`);
        throw new Error(`Error downloading file: ${error}`);
      });
    console.log("File downloaded");
  } catch (error: any) {
    console.log(error.message);
  }
};
