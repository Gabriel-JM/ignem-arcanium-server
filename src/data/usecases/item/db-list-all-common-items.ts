import { ListAllCommonItemsRepository } from '@/data/protocols/repository'
import { ListAllCommonItems, ListAllCommonItemsResult } from '@/domain/usecases'

export class DbListAllCommonItems implements ListAllCommonItems {
  constructor(
    private readonly listAllCommonItemsRepository: ListAllCommonItemsRepository
  ) {}

  async listAll(): Promise<ListAllCommonItemsResult> {
    const items = await this.listAllCommonItemsRepository.listAllCommon()

    return items
  }
}
