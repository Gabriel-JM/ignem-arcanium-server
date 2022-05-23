import { MinValueValidator } from '@/validation/validators'

function makeSut(fields: Record<string, number>) {
  const sut = new MinValueValidator(fields)

  return sut
}

describe('MinValueValidator', () => {
  it('should return the correct error message when it is invalid', () => {
    const sut = makeSut({ field: 10 })

    const response = sut.validate({ field: 9 })

    expect(response).toEqual(['field must be greater or equal to 10'])
  })

  it('should return an empty array if all fields exists', () => {
    const sut = makeSut({ field: 10 })

    const reponse = sut.validate({ field: 11 })

    expect(reponse).toEqual([])
  })
})
