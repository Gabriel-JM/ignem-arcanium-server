import { UpdateTorchRegistry } from '@/domain/usecases/index.js'
import { noContent } from '@/presentation/helpers/index.js'
import { Controller, HTTPResponse } from '@/presentation/protocols/index.js'

interface UpdateTorchRegistryControllerParams {
  id: string
  torchCount?: number | string
  torchCharge?: number | string
  isLit?: boolean
}

export class UpdateTorchRegistryController implements Controller {
  #updateTorchRegistry: UpdateTorchRegistry
  
  constructor(updateTorchRegistry: UpdateTorchRegistry) {
    this.#updateTorchRegistry = updateTorchRegistry
  }
  
  async handle(params: UpdateTorchRegistryControllerParams): Promise<HTTPResponse> {
    await this.#updateTorchRegistry.update({
      id: params.id,
      torchCount: params.torchCount,
      torchCharge: params.torchCharge,
      isLit: params.isLit
    })

    return noContent()
  }
}
