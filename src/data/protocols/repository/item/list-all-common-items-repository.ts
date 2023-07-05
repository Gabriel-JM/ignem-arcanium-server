import { ListAllCommonItemsResult } from '@/domain/usecases/index.ts'

export type ListAllCommonItemsRepositoryResult = ListAllCommonItemsResult

export interface ListAllCommonItemsRepository {
  listAllCommon(): Promise<ListAllCommonItemsRepositoryResult>
}
