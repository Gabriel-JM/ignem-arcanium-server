import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '@/main/server/app'

describe('Create account validation', () => {
  beforeAll(() => {
    chai.use(chaiHttp)
  })

  test('required fields', async () => {
    chai.request(server)
      .post('/accounts')
      .send({})
      .then((response) => {
        const body = JSON.parse(response.text)
        
        expect(response.status).toBe(400)
        expect(body).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'name is required',
              'email is required',
              'password is required',
              'name must be of type string',
              'email must be of type string',
              'password must be of type string',
              'email has an invalid format'
            ]
          }
        })
      })
  })

  test('name type', async () => {
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

  test('invalid email', async () => {
    chai.request(server)
      .post('/accounts')
      .send({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
      .then((response) => {
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
})
