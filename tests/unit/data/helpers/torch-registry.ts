export const dummyFindAllTorchRegistriesRepositoryResult = [{
  id: 'any_id',
  characterName: 'any_name',
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

export function mockUpdateManyTorchRegistriesRepository() {
  return {
    updateMany: jest.fn(() => Promise.resolve())
  }
}
