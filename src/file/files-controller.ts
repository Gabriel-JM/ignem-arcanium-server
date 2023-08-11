import { Controller, HTTPResponse } from '@/common/presentation/protocols/index.js'
import { notFound, ok } from '@/presentation/helpers/http.js'
import { readFile } from 'fs/promises'
import { extname, resolve } from 'path'

interface FileRequest {
  fileId: string
}

export class FilesController implements Controller {
  async handle({ fileId }: FileRequest): Promise<HTTPResponse> {
    try {
      const filePath = resolve('tmp', fileId)
      const file = await readFile(filePath)
      const extension = extname(filePath)

      return ok(file, {
        'Content-Type': `image/${extension}`,
        'Content-Length': String(file.byteLength)
      })
    } catch {
      return notFound('Not Found!')
    }
  }
}
