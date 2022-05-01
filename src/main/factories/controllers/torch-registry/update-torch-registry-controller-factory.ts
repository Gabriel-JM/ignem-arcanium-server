import { DbUpdateTorchRegistry } from '@/data/usecases'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories'
import { makeUpdateTorchRegistryValidator } from '@/main/factories/validators'
import { UpdateTorchRegistryController } from '@/presentation/controllers'

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
