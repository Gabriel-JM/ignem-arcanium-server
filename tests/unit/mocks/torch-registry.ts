import { FindTorchRegistryByIdRepositoryResult } from '@/data/protocols/repository/index.ts'

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
    findAll: vi.fn(() => Promise.resolve(dummyFindAllTorchRegistriesRepositoryResult))
  }
}

export function mockCreateTorchRegistryRepository() {
  return {
    create: vi.fn(() => Promise.resolve())
  }
}

export function mockUpdateManyTorchRegistriesRepository() {
  return {
    updateMany: vi.fn(() => Promise.resolve())
  }
}

export function mockUpdateTorchRegistryRepository() {
  return {
    update: vi.fn(() => Promise.resolve())
  }
}

export function mockFindTorchRegistryByIdRepository() {
  const result = mockRepositoryTorchRegistry()

  return {
    result,
    findById: vi.fn<
      [],
      Promise<FindTorchRegistryByIdRepositoryResult>
    >(() => Promise.resolve(result))
  }
}

export function mockFindAllTorchRegistries() {
  return {
    result: [],
    findAll: vi.fn(() => Promise.resolve([]))
  }
}

export function mockCreateTorchRegistry() {
  const result = 'any_id'
  return {
    result,
    create: vi.fn(() => Promise.resolve(result))
  }
}

export function mockConsumeAllTorchesCharge() {
  return {
    consumeAll: vi.fn(() => Promise.resolve())
  }
}

export function mockUpdateTorchRegistry() {
  return {
    update: vi.fn(() => Promise.resolve())
  }
}

