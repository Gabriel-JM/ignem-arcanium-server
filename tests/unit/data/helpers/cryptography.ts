export function mockTextHasher() {
  return {
    result: 'any_hashed_text',
    hash: jest.fn(() => Promise.resolve('any_hashed_text'))
  }
}
