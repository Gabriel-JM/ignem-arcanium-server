import { setupTestRequest, testRequest } from '@/tests/integration/test-utils/index.js'

describe('Create account validation', () => {
  setupTestRequest()

  test('required fields', async () => {
    const response = await testRequest({
      method: 'post',
      path: '/accounts',
      body: {}
    })
      
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
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
    const response = await testRequest({
      method: 'post',
      path: '/accounts',
      body: {
        name: 12,
        email: 'any@email.com',
        password: 'any_password'
      }
    })
      
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: {
        name: 'Validation Error',
        details: [
          'name must be of type string'
        ]
      }
    })
  })

  test('invalid email', async () => {
    const response = await testRequest({
      method: 'post',
      path: '/accounts',
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    })
      
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: {
        name: 'Validation Error',
        details: [
          'email has an invalid format'
        ]
      }
    })
  })
})
