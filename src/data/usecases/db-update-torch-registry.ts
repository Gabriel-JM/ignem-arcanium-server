import { InvalidTorchAdditionValueError } from '@/data/errors'
import { TorchRegistryNotFoundError } from '@/data/errors/torch-registry-not-found-error'
import {
  FindTorchRegistryByIdRepository,
  UpdateTorchRegistryRepository
} from '@/data/protocols/repository'
import { Torch } from '@/domain/entities'
import { UpdateTorchRegistry, UpdateTorchRegistryParams } from '@/domain/usecases'

export class DbUpdateTorchRegistry implements UpdateTorchRegistry {
  constructor(
    private readonly updateTorchRegistryRepository: UpdateTorchRegistryRepository,
    private readonly findTorchRegistryByIdRepository: FindTorchRegistryByIdRepository
  ) {}
  
  async update(params: UpdateTorchRegistryParams): Promise<void> {
    let torchData = { ...params }
    const isTorchCountString = typeof params.torchCount === 'string'
    const isTorchChargeString = typeof params.torchCharge === 'string'

    if (isTorchChargeString || isTorchCountString) {
      const repositoryTorchData = await this.findTorchRegistryByIdRepository.findById(params.id)

      if (!repositoryTorchData) {
        throw new TorchRegistryNotFoundError({ id: params.id })
      }

      const torch = new Torch({
        count: repositoryTorchData.torchCount,
        charge: repositoryTorchData.torchCharge,
        isLit: repositoryTorchData.isLit
      })

      if (isTorchCountString) {
        const torchCount = String(params.torchCount)

        if (!this.#validateFormat(torchCount)) {
          throw new InvalidTorchAdditionValueError(torchCount)
        }

        const operation = torchCount.at(0)
        const quantity = Number(torchCount.substring(1))

        operation === '+' && torch.addTorch(quantity)
        operation === '-' && torch.removeTorch(quantity)
      }

      if (isTorchChargeString) {
        const torchCharge = String(params.torchCharge)

        if (!this.#validateFormat(torchCharge)) {
          throw new InvalidTorchAdditionValueError(torchCharge)
        }

        const operation = torchCharge.at(0)
        const quantity = Number(torchCharge.substring(1))

        operation === '+' && torch.increaseCharge(quantity)
        operation === '-' && torch.consumeCharge(quantity)
      }

      torchData = { ...torchData, ...torch.getValues() }
    }

    const torchCount = torchData.torchCount
      ? Number(torchData.torchCount)
      : undefined
    const torchCharge = torchData.torchCharge
      ? Number(torchData.torchCharge)
      : undefined
  
    await this.updateTorchRegistryRepository.update({
      id: torchData.id,
      torchCount,
      torchCharge,
      isLit: torchData.isLit
    })
  }

  #validateFormat(value: string) {
    return /^(\+|\-)\d{1,2}$/.test(value)
  }
}
