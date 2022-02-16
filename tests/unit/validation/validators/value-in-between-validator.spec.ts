import { ValueInBetweenValidator } from '@/validation/validators/value-in-between-validator'

function makeSut({ min, max, fieldName }: { min: number, max: number, fieldName: string }) {
  const sut = new ValueInBetweenValidator(min, max, fieldName)

  return sut
}

describe('ValueInBetweenValidator', () => {
  it('should return a message if value is not between min and max', () => {
    const sut = makeSut({ min: 0, max: 10, fieldName: 'count' })

    const response = sut.validate({ count: 12 })

    expect(response).toEqual(['count must be in between 0 and 10'])
  })

  it('should return an empty array if value is in between min and max', () => {
    const sut = makeSut({ min: 0, max: 10, fieldName: 'count' })

    const response = sut.validate({ count: 8 })

    expect(response).toEqual([])
  })
})
