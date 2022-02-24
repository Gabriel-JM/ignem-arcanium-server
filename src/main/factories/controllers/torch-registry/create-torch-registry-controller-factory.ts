import { DbCreateTorchRegistry } from '@/data/usecases'
import { KnexTorchRegistryRepository } from '@/infra/db'
import { connect, KnexHelper } from '@/infra/db/knex/knex-helper'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { ValidationControllerDecorator } from '@/main/decorators'
import { makeCreateTorchRegistryValidator } from '@/main/factories/validators'
import { CreateTorchRegistryController } from '@/presentation/controllers'

export function makeCreateTorchRegistryController() {
  const dbFileName = process.env.NODE_ENV === 'development'
    ? 'ignem-arcanium.db'
    : 'ignem-arcanium.test.db'
  const knexHelper = new KnexHelper(connect(dbFileName))
  const torchRegistryRepository = new KnexTorchRegistryRepository(knexHelper)
  const uniqueIdGenerator = new NanoIdUniqueIdGenerator()
  const dbCreateTorchRegistry = new DbCreateTorchRegistry(
    uniqueIdGenerator,
    torchRegistryRepository
  )

  const controller = new CreateTorchRegistryController(dbCreateTorchRegistry)

  return new ValidationControllerDecorator(
    makeCreateTorchRegistryValidator(),
    controller
  )
}
