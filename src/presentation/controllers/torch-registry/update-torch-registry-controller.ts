import { UpdateTorchRegistry } from '@/domain/usecases'
import { noContent } from '@/presentation/helpers'
import { Controller, HTTPResponse } from '@/presentation/protocols'

interface UpdateTorchRegistryControllerParams {
  id: string
  torchCount?: number | string
  torchCharge?: number | string
  isLit?: boolean
}

export class UpdateTorchRegistryController implements Controller {
  constructor(private readonly updateTorchRegistry: UpdateTorchRegistry) {}
  
  async handle(params: UpdateTorchRegistryControllerParams): Promise<HTTPResponse> {
    await this.updateTorchRegistry.update({
      id: params.id,
      torchCount: params.torchCount,
      torchCharge: params.torchCharge,
      isLit: params.isLit
    })

    return noContent()
  }
}
