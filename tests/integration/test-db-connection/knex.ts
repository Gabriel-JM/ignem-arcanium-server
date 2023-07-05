import { connect } from '@/infra/db/knex/knex-helper.ts'

const testKnex = connect()

export { testKnex }
