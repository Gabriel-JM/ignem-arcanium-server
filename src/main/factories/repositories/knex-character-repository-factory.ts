import { KnexCharacterRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { knexConnection } from '@/main/factories/repositories/knex-connection'

export function makeKnexCharacterRepository() {
  const nanoIdGenerator = new NanoIdUniqueIdGenerator()
  const knexHelper = new KnexHelper(knexConnection)
  const torchRegistryRepository = new KnexCharacterRepository(knexHelper, nanoIdGenerator)

  return torchRegistryRepository
}
