import { KnexAccountRepository } from '@/infra/db/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { knexConnection } from '@/main/factories/repositories/knex-connection.js'

export function makeKnexAccountRepository() {
  const knexHelper = new KnexHelper(knexConnection)
  const repository = new KnexAccountRepository(knexHelper)

  return repository
}
