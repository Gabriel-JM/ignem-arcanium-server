import { KnexTorchRegistryRepository } from '@/infra/db'
import { connect, KnexHelper } from '@/infra/db/knex/knex-helper'

export function makeKnexTorchRegistryRepository() {
  const dbFileName = process.env.NODE_ENV === 'development'
    ? 'ignem-arcanium.db'
    : 'ignem-arcanium.test.db'
  const knexHelper = new KnexHelper(connect(dbFileName))
  const torchRegistryRepository = new KnexTorchRegistryRepository(knexHelper)

  return torchRegistryRepository
}