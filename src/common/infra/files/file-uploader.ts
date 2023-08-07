export interface FileUploader {
  upload(data: Buffer): Promise<string>
}
