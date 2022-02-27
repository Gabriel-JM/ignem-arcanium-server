import { DbFindAllTorchRegistries } from '@/data/usecases'
import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories'
import { FindAllTorchRegistriesController } from '@/presentation/controllers'

export function makeFindAllTorchRegistriesController() {
  const torchRegistryRepository = makeKnexTorchRegistryRepository()
  const dbFindAllTorchRegistries = new DbFindAllTorchRegistries(torchRegistryRepository)

  const controller = new FindAllTorchRegistriesController(dbFindAllTorchRegistries)

  return new ErrorHandlerControllerDecorator(controller)
}
