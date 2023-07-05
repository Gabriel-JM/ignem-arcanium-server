import { KnexCharacterRepository } from '@/infra/db/index.ts'
import { KnexHelper } from '@/infra/db/knex/knex-helper.ts'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/nanoid-unique-id-generator.ts'
import { knexConnection } from '@/main/factories/repositories/knex-connection.ts'

export function makeKnexCharacterRepository() {
  const knexHelper = new KnexHelper(knexConnection)
  const torchRegistryRepository = new KnexCharacterRepository(
    knexHelper,
    new NanoIdUniqueIdGenerator()
  )

  return torchRegistryRepository
}
