import { connect } from '@/infra/db/knex/knex-helper.js'

const knexConnection = connect()

export { knexConnection }
