import { ok } from '@/presentation/helpers/http.js'
import { Controller } from '@/presentation/protocols/controller.js'
import { HTTPResponse } from '@/presentation/protocols/http.js'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

interface FileRequest {
  fileId: string
}

export class FilesController implements Controller {
  async handle({ fileId }: FileRequest): Promise<HTTPResponse> {
    const file = await readFile(resolve('tmp', fileId))

    return ok(file, {
      'content-type': 'image/png'
    })
  }
}
