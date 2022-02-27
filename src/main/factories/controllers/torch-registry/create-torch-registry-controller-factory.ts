import { DbCreateTorchRegistry } from '@/data/usecases'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { ErrorHandlerControllerDecorator, ValidationControllerDecorator } from '@/main/decorators'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories'
import { makeCreateTorchRegistryValidator } from '@/main/factories/validators'
import { CreateTorchRegistryController } from '@/presentation/controllers'

export function makeCreateTorchRegistryController() {
  const torchRegistryRepository = makeKnexTorchRegistryRepository()
  const uniqueIdGenerator = new NanoIdUniqueIdGenerator()
  const dbCreateTorchRegistry = new DbCreateTorchRegistry(
    uniqueIdGenerator,
    torchRegistryRepository
  )

  const controller = new CreateTorchRegistryController(dbCreateTorchRegistry)

  return new ErrorHandlerControllerDecorator(
    new ValidationControllerDecorator(
      makeCreateTorchRegistryValidator(),
      controller
    )
  )
}
