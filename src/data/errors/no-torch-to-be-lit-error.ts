import { CreateTorchRegistryParams } from '@/domain/usecases'

export class NoTorchToBeLitError extends Error {
  name = 'NoTorchToBeLitError'
  type = 'BusinessRule'
  
  constructor(readonly torchRegistry: CreateTorchRegistryParams) {
    super('No torch to be lit')
  }
}
