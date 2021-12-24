import { FindAllTorchRegistriesRepository, UpdateManyTorchRegistriesRepository } from '@/data/protocols/repository'
import { Torch } from '@/domain/entities/torch'
import { ConsumeAllTorchesCharge } from '@/domain/usecases'

export class DbConsumeAllTorchesCharge implements ConsumeAllTorchesCharge {
  constructor(
    private readonly findAllTorchRegistriesRepository: FindAllTorchRegistriesRepository,
    private readonly updateManyTorchRegistriesRepository: UpdateManyTorchRegistriesRepository
  ) {}
  
  async consumeAll() {
    const torchRegistries = await this.findAllTorchRegistriesRepository.findAll()

    if (!torchRegistries.length) return

    const consumedTorchRegistries = torchRegistries.map(torchRegistry => {
      const torch = new Torch({
        count: torchRegistry.torchCount,
        charge: torchRegistry.torchCharge,
        isLit: torchRegistry.isLit
      })

      torch.consumeCharge()

      return {
        id: torchRegistry.id,
        ...torch.getValues()
      }
    })

    await this.updateManyTorchRegistriesRepository.updateMany(consumedTorchRegistries)
  }
}
