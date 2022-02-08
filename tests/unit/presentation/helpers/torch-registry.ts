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
