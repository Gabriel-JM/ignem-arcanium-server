import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '@/main/server/app'
import { testKnex } from '@/tests/integration/test-db-connection/knex'

describe('Create account', () => {
  beforeAll(() => {
    chai.use(chaiHttp)
  })

  afterAll(async () => {
    await testKnex.raw('delete from accounts')
    await testKnex.destroy()
  })

  it('should return the accountId of created account', async () => {
    chai.request(server)
      .post('/accounts')
      .send({
        name: 'User',
        email: 'user@email.com',
        password: 'secret_password'
      })
      .then(response => {
        const body = JSON.parse(response.text)

        expect(response.status).toBe(201)
        expect(body.accountId).toBeDefined()
      })
  })
})
