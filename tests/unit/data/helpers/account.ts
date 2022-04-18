export function mockCreateAccountRepository() {
  return {
    create: jest.fn(() => Promise.resolve())
  }
}