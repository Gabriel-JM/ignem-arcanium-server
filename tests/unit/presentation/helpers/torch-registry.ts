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
