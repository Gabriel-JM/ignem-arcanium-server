import { DbCreateTorchRegistry } from '@/data/usecases'
import { KnexTorchRegistryRepository } from '@/infra/db'
import { connect, KnexHelper } from '@/infra/db/knex/knex-helper'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { CreateTorchRegistryController } from '@/presentation/controllers'

export function makeCreateTorchRegistryController() {
  const knexHelper = new KnexHelper(connect())
  const torchRegistryRepository = new KnexTorchRegistryRepository(knexHelper)
  const uniqueIdGenerator = new NanoIdUniqueIdGenerator()
  const dbCreateTorchRegistry = new DbCreateTorchRegistry(
    uniqueIdGenerator,
    torchRegistryRepository
  )

  return new CreateTorchRegistryController(dbCreateTorchRegistry)
}
