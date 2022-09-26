import { server } from '@/main/server/app.js'
import chai from 'chai'
import chaiHttp from 'chai-http'

describe('Account login validation', () => {
  beforeAll(() => {
    chai.use(chaiHttp)
  })
  
  test('required fields', async () => {
    const response = await chai.request(server)
      .post('/login')
      .send({})
      
    const body = JSON.parse(response.text)

    expect(response.status).toBe(400)
    expect(body).toEqual({
      error: {
        name: 'Validation Error',
        details: [
          'email is required',
          'email must be of type string',
          'email has an invalid format',
          'password is required',
          'password must be of type string'
        ]
      }
    })
  })

  test('invalid email', async () => {
    const response = await chai.request(server)
      .post('/login')
      .send({
        email: 'any_email',
        password: 'any_password'
      })

    const body = JSON.parse(response.text)
      
    expect(response.status).toBe(400)
    expect(body).toEqual({
      error: {
        name: 'Validation Error',
        details: [
          'email has an invalid format'
        ]
      }
    })
  })
})
