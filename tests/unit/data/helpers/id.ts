export function mockUniqueIdGenerator() {
  return {
    generate: jest.fn(() => 'any_id')
  }
}
