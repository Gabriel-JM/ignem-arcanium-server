import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '@/main/server/app'
import { testKnex } from '@/tests/integration/test-db-connection/knex'
import { nanoid } from 'nanoid'
import { JwtEncrypter } from '@/infra/cryptography'

describe('Create account', () => {
  beforeAll(async () => {
    chai.use(chaiHttp)
    await testKnex.raw('delete from accounts')
    await testKnex.destroy()
  })

  it('should return an invalid access token response on invalid token', async () => {
    const response = await chai.request(server)
      .post('/verify')
      .send({ token: 'invalid_token' })

    const body = JSON.parse(response.text)

    expect(response.status).toBe(400)
    expect(body).toEqual({
      error: {
        name: 'InvalidAccessTokenError',
        details: ['Access Token is invalid or expired']
      }
    })
  })

  it('should return a 204 response with no content on verification success', async () => {
    const accountId = nanoid()

    const token = await new JwtEncrypter(process.env.ENCRYPTER_SECRET).encrypt(accountId)

    const response = await chai.request(server)
      .post('/verify')
      .send({ token })

    expect(response.status).toBe(204)
    expect(response.text).toBe('')
  })
})
