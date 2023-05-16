import { ok } from '@/presentation/helpers/http.js'
import { ContentRepository } from './content-repository.js'
import { Content } from './content.js'

export class ContentController {
  #repository: ContentRepository

  constructor(repository: ContentRepository) {
    this.#repository = repository
  }

  async findByAccount(data: { accountId: string }) {
    const contents = await this.#repository.findByAccountId(data.accountId)

    return ok(contents)
  }
  
  async create(data: Content & { accountId: string }) {
    const content = await this.#repository.create({
      ownerId: data.accountId,
      properties: data.properties,
      title: data.title,
      type: data.type,
      value: data.value,
      icon: data.icon,
      cover: data.cover
    })

    return ok(content)
  }
}
