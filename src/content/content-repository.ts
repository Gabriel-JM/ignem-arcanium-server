import { UniqueIdGenerator } from '@/data/protocols/identification/unique-id-generator.ts'
import { Content } from './content.ts'
import { PrismaClient } from '@prisma/client'

type CreateContent = Omit<Content, 'id'>

export class ContentRepository {
  #prisma: PrismaClient
  #idGenerator: UniqueIdGenerator

  constructor(prisma: PrismaClient, idGenerator: UniqueIdGenerator) {
    this.#prisma = prisma
    this.#idGenerator = idGenerator
  }

  async findByAccountId(accountId: string) {
    const contentList = await this.#prisma.contents.findMany({
      where: {
        ownerId: accountId,
        type: 'MainPage'
      }
    })

    return Promise.all(contentList.map(async content => {
      return {
        ...content,
        children: await this.getChildContentChildren(content.id)
      }
    }))
  }

  async getChildContentChildren(parentId: string): Promise<Content[]> {
    const contentChildren = await this.#prisma.$queryRaw<Content[]>`
      select * from content
      join content_children
      on parentId = '${parentId}';
    `

    return Promise.all(contentChildren.map(async content => {
      return {
        ...content,
        children: await this.getChildContentChildren(content.id)
      }
    }))
  }

  // async findByAccountId(accountId: string) {
  //   const contentList = await this.#knex
  //     .table('contents')
  //     .where({ ownerId: accountId, type: 'MainPage' })

  //   const contents = contentList.map(async content => {
  //     const contentChildren = await this.#knex
  //       .table('content_children')
  //       .select('childId')
  //       .where({ parentId: content.id })

  //     const children = await this.#knex
  //       .table('content')
  //       .whereIn('id', contentChildren)

  //     content.children = children

  //     return content
  //   })

  //   return contents
  // }

  async create(data: CreateContent) {
    return await this.#prisma.contents.create({
      data: {
        ...data,
        properties: JSON.stringify(data.properties),
        id: this.#idGenerator.generate('contents')
      }
    })
  }

  // async create(data: CreateContent) {
  //   return await this.#knex
  //     .table('contents')
  //     .insert({
  //       ...data,
  //       id: this.#idGenerator.generate('contents')
  //     })
  //     .returning('*')
  // }
}
