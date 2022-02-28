import { CustomValidator, CustomValidatorRecord } from '@/validation/validators/custom-validator'

function makeSut(fields: Record<string, CustomValidatorRecord>) {
  const sut = new CustomValidator(fields)

  return sut
}

describe('CustomValidator', () => {
  it('should return the correct error message when it is invalid', () => {
    const sut = makeSut({
      value: {
        message: 'value is invalid',
        validationFn(value) {
          return value < 5 || value > 6
        }
      }
    })

    const response = sut.validate({ value: 5 })

    expect(response).toEqual(['value is invalid'])
  })

  it('should return an empty array if every field is valid', () => {
    const sut = makeSut({
      value: {
        message: 'value is invalid',
        validationFn(value) {
          return value < 5 || value > 6
        }
      }
    })

    const response = sut.validate({ value: 4 })

    expect(response).toEqual([])
  })
})
