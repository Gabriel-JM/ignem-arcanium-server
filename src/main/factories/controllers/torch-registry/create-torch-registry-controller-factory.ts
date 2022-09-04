import { DbCreateTorchRegistry } from '@/data/usecases/index.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories/index.js'
import { makeCreateTorchRegistryValidator } from '@/main/factories/validators/index.js'
import { CreateTorchRegistryController } from '@/presentation/controllers/index.js'

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
