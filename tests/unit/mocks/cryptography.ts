export function mockTextHasher() {
  return {
    result: 'any_hashed_text',
    hash: jest.fn(() => Promise.resolve('any_hashed_text'))
  }
}

export function mockHashComparer() {
  return {
    result: true,
    compare: jest.fn(() => Promise.resolve(true))
  }
}

export function mockEncrypter() {
  return {
    result: 'any_token',
    encrypt: jest.fn(() => Promise.resolve('any_token'))
  }
}

export function mockEncryptionVerifier() {
  return {
    result: true,
    verify: jest.fn(() => true)
  }
}

export function mockDecrypter() {
  const result = {
    id: 'any_id'
  }
  
  return {
    result,
    decrypt: jest.fn<any, []>(() => Promise.resolve(result))
  }
}
