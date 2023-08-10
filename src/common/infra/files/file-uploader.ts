export interface FileInfo {
  mimeType: string
  data: Buffer
}

export interface FileUploader {
  upload(info: FileInfo): Promise<string>
}
