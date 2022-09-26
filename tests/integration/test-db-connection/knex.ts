import { connect } from '@/infra/db/knex/knex-helper.js'

const testKnex = connect()

export { testKnex }
