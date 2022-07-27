import { ListAllCommonItemsResult } from '@/domain/usecases'

export type ListAllCommonItemsRepositoryResult = ListAllCommonItemsResult

export interface ListAllCommonItemsRepository {
  listAllCommon(): Promise<ListAllCommonItemsRepositoryResult>
}
