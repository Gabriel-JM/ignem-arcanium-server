import { writeFile } from 'fs/promises'
import { FileUploader } from './file-uploader.js'
import { resolve } from 'path'
import { randomUUID } from 'crypto'

export class LocalFileUploader implements FileUploader {
  #localHost: string

  constructor(localHost: string) {
    this.#localHost = localHost
  }
  
  async upload(data: Buffer): Promise<string> {
    const fileId = randomUUID()
    await writeFile(resolve('tmp', fileId), data)

    return `${this.#localHost}/file/${fileId}`
  }
}
