import { NoTorchToBeLitError } from '@/data/errors'
import { UniqueIdGenerator } from '@/data/protocols/identification'
import { CreateTorchRegistryRepository } from '@/data/protocols/repository'
import {
  CreateTorchRegistry,
  CreateTorchRegistryParams,
} from '@/domain/usecases'

export class DbCreateTorchRegistry implements CreateTorchRegistry {
  constructor(
    private readonly uniqueIdGenerator: UniqueIdGenerator,
    private readonly createTorchRegistryRepository: CreateTorchRegistryRepository
  ) {}
  
  async create(params: CreateTorchRegistryParams) {
    if (params.torchCount === 0 && params.isLit) {
      throw new NoTorchToBeLitError(params)
    }

    const torchRegistryId = this.uniqueIdGenerator.generate()

    await this.createTorchRegistryRepository.create({
      id: torchRegistryId,
      ...params
    });

    return torchRegistryId
  }
}
