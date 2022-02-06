export class InvalidTorchAdditionValueError extends Error {
  constructor(readonly value: string) {
    super('Invalid value passed to torch count or charge addition. value: ' + value)
  }
}
