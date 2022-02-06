import { FindTorchRegistryByIdRepository, UpdateTorchRegistryRepository } from '@/data/protocols/repository'
import { UpdateTorchRegistry, UpdateTorchRegistryParams } from '@/domain/usecases'

export class DbUpdateTorchRegistry implements UpdateTorchRegistry {
  constructor(
    private readonly updateTorchRegistryRepository: UpdateTorchRegistryRepository,
    private readonly findTorchRegistryByIdRepository: FindTorchRegistryByIdRepository
  ) {}
  
  async update(params: UpdateTorchRegistryParams): Promise<void> {
    const isTorchCountString = typeof params.torchCount === 'string'
    const isTorchChargeString = typeof params.torchCharge === 'string'
    let repositoryTorchData = null

    if (isTorchChargeString || isTorchCountString) {
      repositoryTorchData = await this.findTorchRegistryByIdRepository.findById(params.id)
    }

    if (typeof params.torchCount !== 'string' && typeof params.torchCharge !== 'string') {
      await this.updateTorchRegistryRepository.update({
        id: params.id,
        torchCount: params.torchCount && Number(params.torchCount),
        torchCharge: params.torchCharge && Number(params.torchCharge),
        isLit: params.isLit
      })
    }
  }
}
