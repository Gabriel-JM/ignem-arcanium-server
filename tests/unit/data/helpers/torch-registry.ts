export function mockCreateTorchRegistryRepository() {
  return {
    create: jest.fn(() => Promise.resolve())
  }
}
