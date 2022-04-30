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
