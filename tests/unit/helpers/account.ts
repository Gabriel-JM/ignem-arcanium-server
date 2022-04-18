export function mockCreateAccount() {
  return {
    result: 'any_account_id',
    create: jest.fn(() => Promise.resolve('any_account_id'))
  }
}
