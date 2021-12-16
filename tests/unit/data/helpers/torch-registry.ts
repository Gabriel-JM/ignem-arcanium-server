export function mockfindAllTorchRegistriesRepository() {
  return {
    findAll: jest.fn(() => Promise.resolve([]))
  }
}

export function mockCreateTorchRegistryRepository() {
  return {
    create: jest.fn(() => Promise.resolve())
  }
}
