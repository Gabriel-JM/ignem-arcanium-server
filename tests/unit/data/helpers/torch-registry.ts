export function mockCreateTorchRegistryRepository() {
  return {
    create: jest.fn(() => Promise.resolve('any_id'))
  }
}
