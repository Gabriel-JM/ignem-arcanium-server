import { KnexCharacterRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { knexConnection } from '@/main/factories/repositories/knex-connection'

export function makeKnexCharacterRepository() {
  const knexHelper = new KnexHelper(knexConnection)
  const torchRegistryRepository = new KnexCharacterRepository(knexHelper)

  return torchRegistryRepository
}
