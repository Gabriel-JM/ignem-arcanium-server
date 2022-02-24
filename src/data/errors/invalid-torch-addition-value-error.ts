export class InvalidTorchAdditionValueError extends Error {
  name = 'InvalidTorchAdditionValueError'
  type = 'BusinessRule'

  constructor(readonly value: string) {
    super('Invalid value passed to torch count or charge addition. value: ' + value)
  }
}
