import { FieldsValidationComposite } from '@/validation/composites/index.js'

function makeSut(fields: Record<string, string>) {
  return new FieldsValidationComposite(fields)
}

describe('FieldsValidationComposite', () => {
  it('should return the correct list of errors for invalid input', () => {
    const sut = makeSut({
      req: 'number',
      opt: 'string?',
      opt2: 'object?',
      arr: 'array'
    })

    const response = sut.validate({
      arr: 'string',
      opt2: 10
    })

    expect(response).toEqual([
      'req is required',
      'req must be of type number',
      'opt2 must be of type object',
      'arr must be of type array'
    ])
  })

  it('should return empty list of errors for valid input', () => {
    const sut = makeSut({
      req: 'number',
      opt: 'string?',
      opt2: 'object?',
      arr: 'array'
    })

    const response = sut.validate({
      req: 1,
      arr: []
    })

    expect(response).toEqual([])
  })
})
