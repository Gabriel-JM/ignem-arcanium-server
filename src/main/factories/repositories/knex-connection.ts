import { connect } from '@/infra/db/knex/knex-helper.ts'

const knexConnection = connect()

export { knexConnection }
