import { KnexAccountRepository } from '@/infra/db/index.ts'
import { KnexHelper } from '@/infra/db/knex/knex-helper.ts'
import { knexConnection } from '@/main/factories/repositories/knex-connection.ts'

export function makeKnexAccountRepository() {
  const knexHelper = new KnexHelper(knexConnection)
  const repository = new KnexAccountRepository(knexHelper)

  return repository
}
