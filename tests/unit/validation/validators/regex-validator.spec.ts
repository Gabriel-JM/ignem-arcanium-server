import { RegexValidator } from '@/validation/validators'

function makeSut(fields: Record<string, RegExp>) {
  return new RegexValidator(fields)
}

describe('RequiredFieldsValidator', () => {
  it('should return an array of the missing fields', () => {
    const sut = makeSut({
      field1: /^test$/,
      field2: /^[0-9]{2}[a-z]+$/
    })

    const response = sut.validate({
      field1: 'teste',
      field2: '1abc'
    })

    expect(response).toEqual([
      'field1 has an invalid format',
      'field2 has an invalid format'
    ])
  })

  it('should return an empty array if all fields exists', () => {
    const sut = makeSut({
      field: /^\d+$/
    })

    const reponse = sut.validate({ field: '100' })

    expect(reponse).toEqual([])
  })
})
