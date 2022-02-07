import { InvalidTorchAdditionValueError } from '@/data/errors'
import { TorchRegistryNotFoundError } from '@/data/errors/torch-registry-not-found-error'
import {
  FindTorchRegistryByIdRepository,
  UpdateTorchRegistryRepository
} from '@/data/protocols/repository'
import { Torch } from '@/domain/entities'
import { UpdateTorchRegistry, UpdateTorchRegistryParams } from '@/domain/usecases'

export class DbUpdateTorchRegistry implements UpdateTorchRegistry {
  #torchAdditionStringFormat = /^(\+|\-)\d{1,2}$/
  
  constructor(
    private readonly updateTorchRegistryRepository: UpdateTorchRegistryRepository,
    private readonly findTorchRegistryByIdRepository: FindTorchRegistryByIdRepository
  ) {}
  
  async update(params: UpdateTorchRegistryParams): Promise<void> {
    let torchData = { ...params }
    const isTorchCountString = typeof params.torchCount === 'string'
    const isTorchChargeString = typeof params.torchCharge === 'string'

    if (isTorchChargeString || isTorchCountString) {
      const repositoryTorchData = await this.findTorchRegistryByIdRepository
        .findById(params.id)

      if (!repositoryTorchData) {
        throw new TorchRegistryNotFoundError({ id: params.id })
      }

      const torch = new Torch({
        count: repositoryTorchData.torchCount,
        charge: repositoryTorchData.torchCharge,
        isLit: repositoryTorchData.isLit
      })

      if (isTorchCountString) {
        const { operation, quantity } = this.#getOperationAndQuantity(params.torchCount)

        operation === '+' && torch.addTorch(quantity)
        operation === '-' && torch.removeTorch(quantity)
      }

      if (isTorchChargeString) {
        const { operation, quantity } = this.#getOperationAndQuantity(params.torchCharge)

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

  #getOperationAndQuantity(data: string | number | undefined) {
    const stringData = String(data)

    if (!this.#torchAdditionStringFormat.test(stringData)) {
      throw new InvalidTorchAdditionValueError(stringData)
    }

    const operation = stringData.at(0)
    const quantity = Number(stringData.substring(1))

    return { operation, quantity }
  }
}
