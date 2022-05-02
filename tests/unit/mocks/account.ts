import { FindAccountByEmailRepositoryResult } from '@/data/protocols/repository'

export function mockCreateAccount() {
  const result = {
    name: 'any_name',
    token: 'any_token'
  }

  return {
    result,
    create: jest.fn(() => Promise.resolve(result))
  }
}

export function mockCheckAccountByEmailRepository() {
  return {
    result: false,
    checkByEmail: jest.fn(() => Promise.resolve(false))
  }
}

export function mockCreateAccountRepository() {
  return {
    create: jest.fn(() => Promise.resolve())
  }
}

export function mockFindAccountByEmailRepository() {
  const result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }

  return {
    result,
    findByEmail: jest.fn<Promise<FindAccountByEmailRepositoryResult>, []>(
      () => Promise.resolve(result)
    )
  }
}
