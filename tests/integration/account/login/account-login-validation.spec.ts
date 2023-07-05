import { setupTestRequest, testRequest } from '@/tests/integration/test-utils/index.ts'

describe('Account login validation', () => {
  setupTestRequest()

  test('required fields', async () => {
    const response = await testRequest({
      method: 'post',
      path: '/login',
      body: {}
    })
    
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
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
    const response = await testRequest({
      method: 'post',
      path: '/login',
      body: {
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
