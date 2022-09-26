import { Server } from 'node:http'
import { Knex } from 'knex'

export function initServerAndDb(server: Server, testKnex: Knex, tableName: string) {
  beforeAll(async () => {
    await testKnex.migrate.latest()
  })

  beforeEach(() => {
    return new Promise(resolve => {
      server.listen(0, 'localhost', resolve)
    })
  })
  afterEach(() => {
    return new Promise(resolve => {
      server.close(resolve as (err?: Error | undefined) => void)
    })
  })

  afterAll(async () => {
    await testKnex.raw('delete from ' + tableName)
    await testKnex.destroy()
  })
}
