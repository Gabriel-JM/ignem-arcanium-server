import { KnexCharacterRepository } from '@/infra/db/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/nanoid-unique-id-generator.js'
import { knexConnection } from '@/main/factories/repositories/knex-connection.js'

export function makeKnexCharacterRepository() {
  const knexHelper = new KnexHelper(knexConnection)
  const torchRegistryRepository = new KnexCharacterRepository(
    knexHelper,
    new NanoIdUniqueIdGenerator()
  )

  return torchRegistryRepository
}
