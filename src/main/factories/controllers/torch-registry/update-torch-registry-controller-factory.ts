import { DbUpdateTorchRegistry } from '@/data/usecases'
import { ErrorHandlerControllerDecorator, ValidationControllerDecorator } from '@/main/decorators'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories'
import { makeUpdateTorchRegistryValidator } from '@/main/factories/validators/update-torch-registry-validator-factory'
import { UpdateTorchRegistryController } from '@/presentation/controllers'

export function makeUpdateTorchRegistryController() {
  const torchRegistryRepository = makeKnexTorchRegistryRepository()
  const dbUpdateTorchRegistry = new DbUpdateTorchRegistry(
    torchRegistryRepository,
    torchRegistryRepository
  )

  const controller = new UpdateTorchRegistryController(dbUpdateTorchRegistry)

  return new ErrorHandlerControllerDecorator(
    new ValidationControllerDecorator(
      makeUpdateTorchRegistryValidator(),
      controller
    )
  )
}
