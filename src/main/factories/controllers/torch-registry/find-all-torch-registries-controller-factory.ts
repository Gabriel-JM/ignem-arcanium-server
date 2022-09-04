import { DbFindAllTorchRegistries } from '@/data/usecases/index.js'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/index.js'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories/index.js'
import { FindAllTorchRegistriesController } from '@/presentation/controllers/index.js'

export function makeFindAllTorchRegistriesController() {
  const torchRegistryRepository = makeKnexTorchRegistryRepository()
  const dbFindAllTorchRegistries = new DbFindAllTorchRegistries(torchRegistryRepository)

  const controller = new FindAllTorchRegistriesController(dbFindAllTorchRegistries)

  return new ErrorHandlerControllerDecorator(controller)
}
