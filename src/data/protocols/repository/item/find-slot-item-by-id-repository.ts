import { Item } from '@/domain/interfaces/index.ts'

export type FindSlotItemByIdRepositoryResult<T> = Record<keyof T, Item>

export interface FindSlotItemByIdRepository {
  findSlotItemById<T extends Record<string, string>>(
    itemSlots: T
  ): Promise<FindSlotItemByIdRepositoryResult<T>>
}
