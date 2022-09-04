import { CreateTorchRegistry, CreateTorchRegistryParams } from '@/domain/usecases/index.js'
import { ok } from '@/presentation/helpers/index.js'
import { Controller } from '@/presentation/protocols/index.js'

type RequestParams = CreateTorchRegistryParams

export class CreateTorchRegistryController implements Controller {
  #createTorchRegistry: CreateTorchRegistry
  
  constructor(createTorchRegistry: CreateTorchRegistry) {
    this.#createTorchRegistry = createTorchRegistry
  }
  
  async handle(params: RequestParams) {
    const torchRegistryId = await this.#createTorchRegistry.create({
      characterName: params.characterName,
      torchCount: params.torchCount,
      torchCharge: params.torchCharge,
      isLit: params.isLit
    })

    return ok({ id: torchRegistryId })
  }
}
