import { FindTorchRegistryByIdRepositoryResult } from '@/data/protocols/repository'

export const dummyFindAllTorchRegistriesRepositoryResult = [{
  id: 'any_id',
  characterName: 'any_name',
  torchCount: 1,
  torchCharge: 6,
  isLit: true
}]

export const mockRepositoryTorchRegistry = () => ({
  id: 'any_id',
  characterName: 'any_name',
  torchCount: 1,
  torchCharge: 6,
  isLit: true
})

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

export function mockUpdateTorchRegistryRepository() {
  return {
    update: jest.fn(() => Promise.resolve())
  }
}

export function mockFindTorchRegistryByIdRepository() {
  const result = mockRepositoryTorchRegistry()

  return {
    result,
    findById: jest.fn<
      Promise<FindTorchRegistryByIdRepositoryResult>,
      []
    >(() => Promise.resolve(result))
  }
}

export function mockFindAllTorchRegistries() {
  return {
    result: [],
    findAll: jest.fn(() => Promise.resolve([]))
  }
}

export function mockCreateTorchRegistry() {
  const result = 'any_id'
  return {
    result,
    create: jest.fn(() => Promise.resolve(result))
  }
}

export function mockConsumeAllTorchesCharge() {
  return {
    consumeAll: jest.fn(() => Promise.resolve())
  }
}

export function mockUpdateTorchRegistry() {
  return {
    update: jest.fn(() => Promise.resolve())
  }
}

