import { DbUpdateTorchRegistry } from '@/data/usecases/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories/index.js'
import { makeUpdateTorchRegistryValidator } from '@/main/factories/validators/index.js'
import { UpdateTorchRegistryController } from '@/presentation/controllers/index.js'

export function makeUpdateTorchRegistryController() {
  const torchRegistryRepository = makeKnexTorchRegistryRepository()
  const dbUpdateTorchRegistry = new DbUpdateTorchRegistry(
    torchRegistryRepository,
    torchRegistryRepository
  )

  const controller = new UpdateTorchRegistryController(dbUpdateTorchRegistry)

  return applyErrorAndValidationDecorators(
    controller,
    makeUpdateTorchRegistryValidator()
  )
}
