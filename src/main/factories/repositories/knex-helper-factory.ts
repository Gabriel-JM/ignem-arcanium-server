import { KnexHelper } from '@/infra/db/knex/knex-helper.ts'
import { knexConnection } from '@/main/factories/repositories/knex-connection.ts'

export const makeKnexHelper = () => new KnexHelper(knexConnection)
