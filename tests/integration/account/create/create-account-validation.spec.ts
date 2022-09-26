import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '@/main/server/app.js'

describe('Create account validation', () => {
  beforeAll(() => {
    chai.use(chaiHttp)
  })

  test('required fields', async () => {
    const response = await chai.request(server)
      .post('/accounts')
      .send({})
      
    const body = JSON.parse(response.text)
      
    expect(response.status).toBe(400)
    expect(body).toEqual({
      error: {
        name: 'Validation Error',
        details: [
          'name is required',
          'name must be of type string',
          'email is required',
          'email must be of type string',
          'email has an invalid format',
          'password is required',
          'password must be of type string',
        ]
      }
    })
  })

  test('name type', async () => {
    const response = await chai.request(server)
      .post('/accounts')
      .send({
        name: 12,
        email: 'any@email.com',
        password: 'any_password'
      })

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

  test('invalid email', async () => {
    const response = await chai.request(server)
      .post('/accounts')
      .send({
        name: 'any_name',
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
