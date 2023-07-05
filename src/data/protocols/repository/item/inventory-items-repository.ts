import { InventoryItem } from '@/domain/interfaces/index.ts'

export type FindManyItemsByInventoryRepositoryResult = Array<InventoryItem>

export interface InventoryItemsRepository {
  findManyByInventoryId(inventoryId: string): Promise<FindManyItemsByInventoryRepositoryResult>
}
