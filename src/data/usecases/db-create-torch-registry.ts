import { NoTorchToBeLitError } from '@/data/errors'
import { CreateTorchRegistryRepository } from '@/data/protocols/repository'
import {
  CreateTorchRegistry,
  CreateTorchRegistryParams,
} from '@/domain/usecases'

export class DbCreateTorchRegistry implements CreateTorchRegistry {
  constructor(private readonly createTorchRegistryRepository: CreateTorchRegistryRepository) {}
  
  async create(params: CreateTorchRegistryParams) {
    if (params.torchCount === 0 && params.isLit) {
      throw new NoTorchToBeLitError(params)
    }

    const torchRegistryId = await this.createTorchRegistryRepository.create({
      ...params,
      torchCharge: params.torchCharge || 0
    });

    return torchRegistryId
  }
}
