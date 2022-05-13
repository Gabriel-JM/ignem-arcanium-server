export class InvalidAccessTokenError extends Error {
  name = 'InvalidAccessTokenError'
  type = 'BusinessRule'

  constructor() {
    super('Access Token is invalid or expired')
  }
}
