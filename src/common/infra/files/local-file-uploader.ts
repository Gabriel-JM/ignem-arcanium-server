import { mkdir, writeFile } from 'fs/promises'
import { FileInfo, FileUploader } from './file-uploader.js'
import { resolve } from 'path'
import { randomUUID } from 'crypto'
import { existsSync } from 'fs'

export class LocalFileUploader implements FileUploader {
  #localHost: string

  constructor(localHost: string) {
    this.#localHost = localHost
  }
  
  async upload(info: FileInfo): Promise<string> {
    const { data, mimeType } = info
    const extension = this.#getExtensionFromMimeType(mimeType)
    const fileId = randomUUID()
    const fileName = `${fileId}.${extension}`

    if (!existsSync(resolve('tmp'))) {
      await mkdir(resolve('tmp'))
    }

    await writeFile(resolve('tmp', fileName), data, {
      encoding: 'binary'
    })

    return `${this.#localHost}/file/${fileName}`
  }

  #getExtensionFromMimeType(mimeType: string) {
    let [, type] = mimeType.split('/')

    if (type === 'jpeg') {
      type = 'jpg'
    }

    return type.toLowerCase()
  }
}
