export function mockCreateTorchRegistry() {
  const result = 'any_id'
  return {
    result,
    create: jest.fn(() => Promise.resolve(result))
  }
}
