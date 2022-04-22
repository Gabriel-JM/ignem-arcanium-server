import request from 'superwstest'
import { server } from '@/main/server/app'
import { initServerAndDb } from '@/tests/integration/connection'
import { testKnex } from '@/tests/integration/test-db-connection/knex'

describe('Create account', () => {
  initServerAndDb(server, testKnex, 'accounts')

  it('should return the accountId of created account', async () => {
    await request(server)
      .post('/accounts')
      .send({
        name: 'User',
        email: 'user@email.com',
        password: 'secret_password'
      })
      .expect(201)
  })
})
