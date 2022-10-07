import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { knexConnection } from '@/main/factories/repositories/knex-connection.js'

type RepositoryConstructor<T> = new (knexHelper: KnexHelper) => T

export function makeKnexRepository<T>(RepositoryClass: RepositoryConstructor<T>) {
  return new RepositoryClass(new KnexHelper(knexConnection))
}
