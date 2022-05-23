import { MinValueValidator } from '@/validation/validators'

function makeSut(minValue: number, fields: string[]) {
  const sut = new MinValueValidator(minValue, fields)

  return sut
}

describe('MinValueValidator', () => {
  it('should return the correct error message when it is invalid', () => {
    const sut = makeSut(10, ['field'])

    const response = sut.validate({ field: 9 })

    expect(response).toEqual(['field must be greater or equal to 10'])
  })

  it('should return an empty array if all fields exists', () => {
    const sut = makeSut(10, ['field'])

    const reponse = sut.validate({ field: 11 })

    expect(reponse).toEqual([])
  })
})
