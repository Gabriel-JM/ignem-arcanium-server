import { testKnex } from '@/tests/integration/test-db-connection/knex.js'
import chaiHttp from 'chai-http'

export function testSetup(...tablesToClear: string[]) {
  beforeAll(setupTestRequest)
  beforeEach(clearTables(...tablesToClear))
  afterAll(closeDbConnection)
}

export function setupTestRequest() {
  chai.use(chaiHttp)
}

export function clearTables(...tablesToClear: string[]) {
  return async () => {
    for (const table of tablesToClear) {
      await testKnex.table(table).delete()
    }
  }
}

export async function closeDbConnection() {
  await testKnex.destroy()
}
