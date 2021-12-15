import { CreateTorchRegistryParams } from '@/domain/usecases'

export class NoTorchToBeLitError extends Error {
  constructor(readonly torchRegistry: CreateTorchRegistryParams) {
    super('No torch to be lit')
  }
}
