import { testKnex } from '@/tests/integration/test-db-connection/knex.js'
import chaiHttp from 'chai-http'

export function testSetup(...tablesToClear: string[]) {
  setupTestRequest()

  afterEach(async () => {
    for (const table of tablesToClear) {
      await testKnex.raw(`delete from ${table}`)
    }
  })

  afterAll(async () => {
    await testKnex.destroy()
  })
}

export function setupTestRequest() {
  beforeAll(() => void chai.use(chaiHttp))
}
