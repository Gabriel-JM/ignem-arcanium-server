import chai from 'chai'
import { server } from '@/main/server/app.js'
import { testKnex } from '@/tests/integration/test-db-connection/knex.js'
import { randomUUID } from 'crypto'
import { testSetup } from '@/tests/integration/test-utils/test-setup.js'

describe('Create account', () => {
  testSetup('characters', 'accounts')

  it('should return the accountId of created account', async () => {
    const response = await chai.request(server)
      .post('/accounts')
      .send({
        name: 'User',
        email: 'new-account@email.com',
        password: 'secret_password'
      })
      
    const body = JSON.parse(response.text)

    expect(response.status).toBe(201)
    expect(body.name).toBe('User')
    expect(typeof body.token).toBe('string')
  })

  it('should return email already in use for duplicated emails', async () => {
    await testKnex.table('accounts').insert({
      id: randomUUID(),
      name: 'User',
      email: 'already_in_use@email.com',
      password: 'any_password'
    })
    
    const response = await chai.request(server)
      .post('/accounts')
      .send({
        name: 'User',
        email: 'already_in_use@email.com',
        password: 'secret_password'
      })

    const body = JSON.parse(response.text)

    expect(response.status).toBe(400)
    expect(body).toEqual({
      error: {
        name: 'EmailAlreadyInUseError',
        details: ['Provided E-Mail is already in use']
      }
    })
  })
})
