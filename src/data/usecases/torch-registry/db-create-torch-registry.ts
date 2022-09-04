import { NoTorchToBeLitError } from '@/data/errors/index.js'
import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'
import { CreateTorchRegistryRepository } from '@/data/protocols/repository/index.js'
import {
  CreateTorchRegistry,
  CreateTorchRegistryParams,
} from '@/domain/usecases/index.js'

export class DbCreateTorchRegistry implements CreateTorchRegistry {
  #uniqueIdGenerator: UniqueIdGenerator
  #createTorchRegistryRepository: CreateTorchRegistryRepository  
  
  constructor(
    uniqueIdGenerator: UniqueIdGenerator,
    createTorchRegistryRepository: CreateTorchRegistryRepository
  ) {
    this.#uniqueIdGenerator = uniqueIdGenerator
    this.#createTorchRegistryRepository = createTorchRegistryRepository
  }
  
  async create(params: CreateTorchRegistryParams) {
    if (params.torchCount === 0 && params.isLit) {
      throw new NoTorchToBeLitError(params)
    }

    const torchRegistryId = this.#uniqueIdGenerator.generate()

    await this.#createTorchRegistryRepository.create({
      id: torchRegistryId,
      ...params
    });

    return torchRegistryId
  }
}
