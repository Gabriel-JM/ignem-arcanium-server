import { CreateTorchRegistryRepository } from '@/data/protocols/repository'
import {
  CreateTorchRegistry,
  CreateTorchRegistryParams,
  CreateTorchRegistryResult
} from '@/domain/usecases'

export class DbCreateTorchRegistry implements CreateTorchRegistry {
  constructor(private readonly createTorchRegistryRepository: CreateTorchRegistryRepository) {}
  
  async create(params: CreateTorchRegistryParams) {
    await this.createTorchRegistryRepository.create({
      ...params,
      torchCharge: params.torchCharge || 0
    });

    return { id: '' }
  }
}
