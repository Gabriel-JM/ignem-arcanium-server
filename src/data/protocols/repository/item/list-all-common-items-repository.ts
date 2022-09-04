import { ListAllCommonItemsResult } from '@/domain/usecases/index.js'

export type ListAllCommonItemsRepositoryResult = ListAllCommonItemsResult

export interface ListAllCommonItemsRepository {
  listAllCommon(): Promise<ListAllCommonItemsRepositoryResult>
}
