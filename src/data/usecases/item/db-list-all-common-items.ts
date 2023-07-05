import { ListAllCommonItemsRepository } from '@/data/protocols/repository/index.ts'
import { ListAllCommonItems, ListAllCommonItemsResult } from '@/domain/usecases/index.ts'

export class DbListAllCommonItems implements ListAllCommonItems {
  #listAllCommonItemsRepository: ListAllCommonItemsRepository

  constructor(
    listAllCommonItemsRepository: ListAllCommonItemsRepository
  ) {
    this.#listAllCommonItemsRepository = listAllCommonItemsRepository
  }

  async listAll(): Promise<ListAllCommonItemsResult> {
    const items = await this.#listAllCommonItemsRepository.listAllCommon()

    return items
  }
}
