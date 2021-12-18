export const dummyFindAllTorchRegistriesRepositoryResult = [{
  torchCount: 1,
  torchCharge: 6,
  isLit: true
}]

export function mockfindAllTorchRegistriesRepository() {
  return {
    result: dummyFindAllTorchRegistriesRepositoryResult,
    findAll: jest.fn(() => Promise.resolve(dummyFindAllTorchRegistriesRepositoryResult))
  }
}

export function mockCreateTorchRegistryRepository() {
  return {
    create: jest.fn(() => Promise.resolve())
  }
}
