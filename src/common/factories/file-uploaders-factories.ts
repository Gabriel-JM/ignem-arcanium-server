import { LocalFileUploader } from '../infra/files/local-file-uploader.js'

export function makeLocalFileUploader() {
  return new LocalFileUploader(process.env.SERVER_HOST)
}
