import { testKnex } from '@/tests/integration/test-db-connection/knex.js'
import chaiHttp from 'chai-http'

export function testSetup(...tablesToClear: string[]) {
  setupTestRequest()

  afterEach(async () => {
    for (const table of tablesToClear) {
      await testKnex.table(table).delete()
    }
  })

  afterAll(async () => {
    await testKnex.destroy()
  })
}

export function setupTestRequest() {
  beforeAll(() => void chai.use(chaiHttp))
}
