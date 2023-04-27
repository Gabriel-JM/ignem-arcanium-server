import { ok } from '@/presentation/helpers/http.js'
import { ContentRepository } from './content-repository.js'
import { Content } from './content.js'

export class ContentController {
  #repository: ContentRepository

  constructor(repository: ContentRepository) {
    this.#repository = repository
  }
  
  async create(data: Content) {
    const content = await this.#repository.create(data)

    return ok(content)
  }
}
