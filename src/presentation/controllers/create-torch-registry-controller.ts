import { CreateTorchRegistry, CreateTorchRegistryParams } from '@/domain/usecases'

type RequestParams = CreateTorchRegistryParams

export class CreateTorchRegistryController {
  constructor(private readonly createTorchRegistry: CreateTorchRegistry) {}
  
  async handle(params: RequestParams) {
    await this.createTorchRegistry.create(params)
  }
}
