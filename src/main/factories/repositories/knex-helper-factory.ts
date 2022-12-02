import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { knexConnection } from '@/main/factories/repositories/knex-connection.js'

export const makeKnexHelper = () => new KnexHelper(knexConnection)
