import { TypeValidator } from '@/validation/validators/index.ts'

function makeSut(fields: Record<string, string | string[]>) {
  const sut = new TypeValidator(fields)

  return sut
}

describe('TypeValidator', () => {
  it('should return an array of invalid type message', () => {
    const sut = makeSut({
      list: 'array',
      num: 'number',
      obj: 'object',
      str: 'string',
      bool: 'boolean'
    })

    const response = sut.validate({
      list: 0,
      num: true,
      obj: '',
      str: {},
      bool: []
    })

    expect(response).toEqual([
      'list must be of type array',
      'num must be of type number',
      'obj must be of type object',
      'str must be of type string',
      'bool must be of type boolean'
    ])
  })

  it('should correct validate array values', () => {
    const sut = makeSut({
      list: 'array',
      num: 'number',
      obj: 'object',
      str: 'string',
      bool: 'boolean'
    })

    const response = sut.validate({
      list: [],
      num: 10,
      obj: {},
      str: 'string',
      bool: true
    })

    expect(response).toEqual([])
  })

  it('should validate one of types passed as array', () => {
    const sut = makeSut({
      value1: ['string', 'number'],
      value2: ['number', 'boolean']
    })

    const response = sut.validate({
      value1: 10,
      value2: 'wrong-value'
    })

    expect(response).toEqual([
      'value2 must be one of types: number, boolean'
    ])
  })

  it('should not validate null values', () => {
    const sut = makeSut({
      obj: 'object',
      str: 'string'
    })

    const response = sut.validate({ obj: null, str: null })

    expect(response).toEqual([])
  })
})
