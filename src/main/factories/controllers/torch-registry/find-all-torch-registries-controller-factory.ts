import { DbFindAllTorchRegistries } from '@/data/usecases'
import { KnexTorchRegistryRepository } from '@/infra/db'
import { connect, KnexHelper } from '@/infra/db/knex/knex-helper'
import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { FindAllTorchRegistriesController } from '@/presentation/controllers'

export function makeFindAllTorchRegistriesController() {
  const dbFileName = process.env.NODE_ENV === 'development'
    ? 'ignem-arcanium.db'
    : 'ignem-arcanium.test.db'
  const knexHelper = new KnexHelper(connect(dbFileName))
  const torchRegistryRepository = new KnexTorchRegistryRepository(knexHelper)
  const dbFindAllTorchRegistries = new DbFindAllTorchRegistries(torchRegistryRepository)

  const controller = new FindAllTorchRegistriesController(dbFindAllTorchRegistries)

  return new ErrorHandlerControllerDecorator(controller)
}
