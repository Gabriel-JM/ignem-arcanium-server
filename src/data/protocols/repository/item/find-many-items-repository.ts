import { Item } from '@/domain/interfaces/index.js'

export type FindManyItemsRepositoryResult = Item[]

export interface FindManyItemsRepository {
  findMany(ids: string[]): Promise<FindManyItemsRepositoryResult>
}
