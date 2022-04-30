export class AccountNotFoundError extends Error {
  name = 'AccountNotFoundError'
  type = 'BusinessRule'

  constructor() {
    super('Login failure, email or password are incorrect')
  }
}
