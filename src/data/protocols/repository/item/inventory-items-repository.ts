import { InventoryItem } from '@/domain/interfaces/index.js'

export type FindManyItemsByInventoryRepositoryResult = Array<InventoryItem>

export interface InventoryItemsRepository {
  findManyByInventoryId(): Promise<FindManyItemsByInventoryRepositoryResult>
}
