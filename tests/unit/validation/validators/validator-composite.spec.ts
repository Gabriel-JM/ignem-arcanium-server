import { ValidatorComposite } from '@/validation/composites'
import { Validator } from '@/validation/protocols'

class FakeValidator implements Validator {
  result: string[] = []
  validate = vi.fn<[], string[]>(() => this.result)
}

function makeSut() {
  const validator1 = new FakeValidator()
  const validator2 = new FakeValidator()
  const sut = new ValidatorComposite([validator1, validator2])

  return {
    sut,
    validator1,
    validator2
  }
}

describe('ValidatorComposite', () => {
  it('should call all validators with same input', () => {
    const { sut, validator1, validator2 } = makeSut()
    const input = { count: 10 }

    sut.validate(input)

    expect(validator1.validate).toHaveBeenCalledWith(input)
    expect(validator2.validate).toHaveBeenCalledWith(input)
  })

  it('should return all validators errors in the same array', () => {
    const { sut, validator1, validator2 } = makeSut()
    validator1.validate.mockReturnValueOnce([
      'count must be of type number', 
      'name must be of type string'
    ])
    validator2.validate.mockReturnValueOnce([
      'name has invalid format',
      'count must be between 0 and 10'
    ])

    const response = sut.validate({ count: '10' })

    expect(response).toEqual([
      'count must be of type number',
      'count must be between 0 and 10',
      'name must be of type string',
      'name has invalid format'
    ])
  })
})
