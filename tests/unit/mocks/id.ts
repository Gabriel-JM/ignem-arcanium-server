export function mockUniqueIdGenerator() {
  return {
    result: 'any_id',
    generate: vi.fn(() => 'any_id')
  }
}
