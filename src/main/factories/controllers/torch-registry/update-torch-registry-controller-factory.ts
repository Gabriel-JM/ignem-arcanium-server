import { DbUpdateTorchRegistry } from '@/data/usecases'
import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories'
import { UpdateTorchRegistryController } from '@/presentation/controllers'

export function makeUpdateTorchRegistryController() {
  const torchRegistryRepository = makeKnexTorchRegistryRepository()
  const dbUpdateTorchRegistry = new DbUpdateTorchRegistry(
    torchRegistryRepository,
    torchRegistryRepository
  )

  const controller = new UpdateTorchRegistryController(dbUpdateTorchRegistry)

  return new ErrorHandlerControllerDecorator(
    controller
  )
}
