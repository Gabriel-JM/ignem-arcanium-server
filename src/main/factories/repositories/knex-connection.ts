import { connect } from '@/infra/db/knex/knex-helper'

const knexConnection = connect()

export { knexConnection }
