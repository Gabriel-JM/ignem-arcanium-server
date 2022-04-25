import { server } from '@/main/server/app'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { testKnex } from '@/tests/integration/test-db-connection/knex'

describe('Create account validation', () => {
  beforeAll(() => {
    chai.use(chaiHttp)
  })

  afterAll(async () => {
    await testKnex.raw('delete from accounts')
    await testKnex.destroy()
    server.close()
  })

  test('name', async () => {
    chai.request(server)
      .post('/accounts')
      .send({
        name: 12,
        email: 'any@email.com',
        password: 'any_password'
      })
      .then((response) => {
        const body = JSON.parse(response.text)
        
        expect(response.status).toBe(400)
        expect(body).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'name must be of type string'
            ]
          }
        })
      })
  })
})
