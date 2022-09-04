import { KnexTorchRegistryRepository } from '@/infra/db/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { knexConnection } from '@/main/factories/repositories/index.js'

export function makeKnexTorchRegistryRepository() {
  const knexHelper = new KnexHelper(knexConnection)
  const torchRegistryRepository = new KnexTorchRegistryRepository(knexHelper)

  return torchRegistryRepository
}
