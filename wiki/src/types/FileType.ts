export type FileType = {
  downloadUrl: string;
  path: string;
  id: string;
  repository: string;
  contentType: string;
  lastModified: string;
  lastDownloaded: null | string;
  fileSize: number;
};
