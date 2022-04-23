import { server } from '@/main/server/app'
import { httpRequest } from '@/tests/integration/http'

describe('Create account validation', () => {
  beforeAll(() => {
    server.listen(3333)
  })

  afterAll(() => {
    server.close()
  })

  test('name', async () => {
    const response = await httpRequest({
      method: 'post',
      url: 'http://localhost:3333/accounts',
      body: {
        name: 12,
        email: 'any@email.com',
        password: 'any_password'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      error: {
        details: [
          'name must be a string'
        ]
      }
    })
  })
})
