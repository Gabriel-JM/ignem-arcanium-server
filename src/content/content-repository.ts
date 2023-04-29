import { UniqueIdGenerator } from '@/data/protocols/identification/unique-id-generator.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { Content } from './content.js'

type CreateContent = Omit<Content, 'id'>

export class ContentRepository {
  #knex: KnexHelper
  #idGenerator: UniqueIdGenerator

  constructor(knex: KnexHelper, idGenerator: UniqueIdGenerator) {
    this.#knex = knex
    this.#idGenerator = idGenerator
  }

  async findByAccountId(accountId: string) {
    const contentList = await this.#knex
      .table('contents')
      .where({ ownerId: accountId, type: 'MainPage' })

    const contents = contentList.map(async content => {
      const contentChildren = await this.#knex
        .table('content_children')
        .select('childId')
        .where({ parentId: content.id })

      const children = await this.#knex
        .table('content')
        .whereIn('id', contentChildren)

      content.children = children

      return content
    })

    return contents
  }

  async create(data: CreateContent) {
    return await this.#knex
      .table('contents')
      .insert({
        ...data,
        id: this.#idGenerator.generate('contents')
      })
      .returning('*')
  }
}
