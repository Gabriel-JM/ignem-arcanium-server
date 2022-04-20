import { Server } from 'http'
import { Knex } from 'knex'

export function initServerAndDb(server: Server, testKnex: Knex, tableName: string) {
  beforeAll(async () => {
    await testKnex.migrate.latest()
  })

  beforeEach((done) => void server.listen(0, 'localhost', done))
  afterEach((done) => void server.close(done))

  afterAll(async () => {
    await testKnex.raw('delete from ' + tableName)
    await testKnex.destroy()
  })
}
