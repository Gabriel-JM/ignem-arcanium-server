export function mockUniqueIdGenerator() {
  return {
    result: 'any_id',
    generate: jest.fn(() => 'any_id')
  }
}
