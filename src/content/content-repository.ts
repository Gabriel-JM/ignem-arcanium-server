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
