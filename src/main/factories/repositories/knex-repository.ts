import { KnexHelper } from '@/infra/db/knex/knex-helper.ts'
import { knexConnection } from '@/main/factories/repositories/knex-connection.ts'

type RepositoryConstructor<T> = new (knexHelper: KnexHelper) => T

export function makeKnexRepository<T>(RepositoryClass: RepositoryConstructor<T>) {
  return new RepositoryClass(new KnexHelper(knexConnection))
}
