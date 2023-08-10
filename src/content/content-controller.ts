import { ok } from '@/presentation/helpers/http.js'
import { ContentRepository } from './content-repository.js'
import { FileUploader } from '@/common/infra/files/file-uploader.js'

interface RequestContent {
  accountId: string
  cover?: {
    filename: string
    mimeType: string
    data: Buffer
  }
  icon?: {
    filename: string
    mimeType: string
    data: Buffer
  }
  type: string
  title: string
  value: string
  properties: Record<string, unknown>
}

export class ContentController {
  #repository: ContentRepository
  #fileUploader: FileUploader

  constructor(repository: ContentRepository, fileUploader: FileUploader) {
    this.#repository = repository
    this.#fileUploader = fileUploader
  }

  async findByAccount(data: { accountId: string }) {
    const contents = await this.#repository.findByAccountId(data.accountId)

    return ok(contents)
  }
  
  async create(data: RequestContent) {
    let coverURL: string | null = null
    let iconURL: string | null = null
    
    if (data.cover) {
      coverURL = await this.#fileUploader.upload(data.cover)
    }

    if (data.icon) {
      iconURL = await this.#fileUploader.upload(data.icon)
    }
    
    const content = await this.#repository.create({
      ownerId: data.accountId,
      properties: data.properties,
      title: data.title,
      type: data.type,
      value: data.value,
      ...coverURL && { cover: coverURL },
      ...iconURL && { icon: iconURL }
    })

    return ok(content)
  }
}
