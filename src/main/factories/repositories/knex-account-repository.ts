import { KnexAccountRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { knexConnection } from '@/main/factories/repositories/knex-connection'

export function makeKnexAccountRepository() {
  const knexHelper = new KnexHelper(knexConnection)
  const repository = new KnexAccountRepository(knexHelper)

  return repository
}
