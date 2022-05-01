import { DbCreateTorchRegistry } from '@/data/usecases'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators'
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

  return applyErrorAndValidationDecorators(
    controller,
    makeCreateTorchRegistryValidator()
  )
}
