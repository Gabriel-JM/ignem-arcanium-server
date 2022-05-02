export class EmailAlreadyInUseError extends Error {
  name = 'EmailAlreadyInUseError'
  type = 'BusinessRule'

  constructor() {
    super('Provided E-Mail is already in use')
  }
}
