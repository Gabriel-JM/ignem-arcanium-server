export function mockFindAccountByEmailRepository() {
  const result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }

  return {
    result,
    findByEmail: jest.fn(() => Promise.resolve(result))
  }
}
