import { FindAccountByEmailRepositoryResult } from '@/data/protocols/repository/index.js'

export function fakeAccount() {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }
}

export function mockCreateAccount() {
  const result = {
    name: 'any_name',
    token: 'any_token'
  }

  return {
    result,
    create: vi.fn(() => Promise.resolve(result))
  }
}

export function mockCheckAccountByEmailRepository() {
  return {
    result: false,
    checkByEmail: vi.fn(() => Promise.resolve(false))
  }
}

export function mockCreateAccountRepository() {
  return {
    create: vi.fn(() => Promise.resolve())
  }
}

export function mockFindAccountByEmailRepository() {
  const result = fakeAccount()

  return {
    result,
    findByEmail: vi.fn<[], Promise<FindAccountByEmailRepositoryResult>>(
      () => Promise.resolve(result)
    )
  }
}

export function mockFindAccountByIdRepository() {
  const result = fakeAccount()
  
  return {
    result,
    findById: vi.fn(() => Promise.resolve(result))
  }
}
