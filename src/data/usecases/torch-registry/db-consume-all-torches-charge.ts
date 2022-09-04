import {
  FindAllTorchRegistriesRepository,
  UpdateManyTorchRegistriesRepository
} from '@/data/protocols/repository/index.js'
import { Torch } from '@/domain/entities/index.js'
import { ConsumeAllTorchesCharge } from '@/domain/usecases/index.js'

export class DbConsumeAllTorchesCharge implements ConsumeAllTorchesCharge {
  #findAllTorchRegistriesRepository: FindAllTorchRegistriesRepository
  #updateManyTorchRegistriesRepository: UpdateManyTorchRegistriesRepository  
  
  constructor(
    findAllTorchRegistriesRepository: FindAllTorchRegistriesRepository,
    updateManyTorchRegistriesRepository: UpdateManyTorchRegistriesRepository
  ) {
    this.#findAllTorchRegistriesRepository = findAllTorchRegistriesRepository
    this.#updateManyTorchRegistriesRepository = updateManyTorchRegistriesRepository
  }
  
  async consumeAll() {
    const torchRegistries = await this.#findAllTorchRegistriesRepository.findAll()

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

    await this.#updateManyTorchRegistriesRepository.updateMany(consumedTorchRegistries)
  }
}
