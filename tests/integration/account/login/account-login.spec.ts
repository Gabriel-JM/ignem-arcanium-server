import chai from 'chai'
import chaiHttp from 'chai-http'
import bcrypt from 'bcrypt'
import { server } from '@/main/server/app'
import { testKnex } from '@/tests/integration/test-db-connection/knex'
import { randomUUID } from 'crypto'

describe('Create account', () => {
  beforeAll(async () => {
    chai.use(chaiHttp)
    await testKnex.raw('delete from accounts')
  })

  afterAll(async () => {
    await testKnex.raw('delete from accounts')
    await testKnex.destroy()
  })

  it('should return an account not found error if an unregistred email is provided', async () => {
    const response = await chai.request(server)
      .post('/login')
      .send({
        email: 'unregistred@email.com',
        password: 'secret_password'
      })

    const body = JSON.parse(response.text)

    expect(response.status).toBe(400)
    expect(body).toEqual({
      error: {
        name: 'AccountNotFoundError',
        details: ['Login failure, email or password are incorrect']
      }
    })
  })

  it('should return an account not found error if passwords did not match', async () => {
    await testKnex.table('accounts').insert({
      id: randomUUID(),
      name: 'any_name',
      email: 'valid@email.com',
      password: 'correct_password'
    })

    const response = await chai.request(server)
      .post('/login')
      .send({
        email: 'valid@email.com',
        password: 'wrong_password'
      })

    const body = JSON.parse(response.text)

    expect(response.status).toBe(400)
    expect(body).toEqual({
      error: {
        name: 'AccountNotFoundError',
        details: ['Login failure, email or password are incorrect']
      }
    })
  })

  it('should return the name and token on login success', async () => {
    const hashedPassword = await bcrypt.hash('any_password', 12)
    await testKnex.table('accounts').insert({
      id: randomUUID(),
      name: 'any_name',
      email: 'user@email.com',
      password: hashedPassword
    })

    const response = await chai.request(server)
      .post('/login')
      .send({
        email: 'user@email.com',
        password: 'any_password'
      })

    const body = JSON.parse(response.text)

    expect(response.status).toBe(200)
    expect(body.name).toBe('any_name')
    expect(typeof body.token).toBe('string')
  })
})
