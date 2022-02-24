import { CreateTorchRegistry, CreateTorchRegistryParams } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols'

type RequestParams = CreateTorchRegistryParams

export class CreateTorchRegistryController implements Controller {
  constructor(private readonly createTorchRegistry: CreateTorchRegistry) {}
  
  async handle(params: RequestParams) {
    const torchRegistryId = await this.createTorchRegistry.create({
      characterName: params.characterName,
      torchCount: params.torchCount,
      torchCharge: params.torchCharge,
      isLit: params.isLit
    })

    return ok({ id: torchRegistryId })
  }
}
