import { connect } from '@/infra/db/knex/knex-helper'

const testKnex = connect()

export { testKnex }
