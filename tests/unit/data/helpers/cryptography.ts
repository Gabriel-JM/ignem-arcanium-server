export function mockTextHasher() {
  return {
    result: 'any_hashed_text',
    hash: jest.fn(() => 'any_hashed_text')
  }
}
