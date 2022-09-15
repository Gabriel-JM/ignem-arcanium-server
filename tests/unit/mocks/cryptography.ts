export function mockTextHasher() {
  return {
    result: 'any_hashed_text',
    hash: vi.fn(() => Promise.resolve('any_hashed_text'))
  }
}

export function mockHashComparer() {
  return {
    result: true,
    compare: vi.fn(() => Promise.resolve(true))
  }
}

export function mockEncrypter() {
  return {
    result: 'any_token',
    encrypt: vi.fn(() => Promise.resolve('any_token'))
  }
}

export function mockEncryptionVerifier() {
  return {
    result: true,
    verify: vi.fn(() => true)
  }
}

export function mockDecrypter() {
  const result = {
    id: 'any_id'
  }
  
  return {
    result,
    decrypt: vi.fn<[], Promise<any>>(() => Promise.resolve(result))
  }
}
