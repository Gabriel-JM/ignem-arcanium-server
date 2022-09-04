import { KnexCharacterRepository } from '@/infra/db/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { knexConnection } from '@/main/factories/repositories/knex-connection.js'

export function makeKnexCharacterRepository() {
  const nanoIdGenerator = new NanoIdUniqueIdGenerator()
  const knexHelper = new KnexHelper(knexConnection)
  const torchRegistryRepository = new KnexCharacterRepository(knexHelper, nanoIdGenerator)

  return torchRegistryRepository
}
