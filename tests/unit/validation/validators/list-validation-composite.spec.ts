import { ListValidationComposite } from '@/validation/composites/index.js'
import { Validator } from '@/validation/protocols/index.js'

class FakeValidator implements Validator {
  result: string[] = []
  validate = vi.fn<[], string[]>(() => this.result)
}

function makeSut() {
  const validator1 = new FakeValidator()
  const validator2 = new FakeValidator()
  const sut = new ListValidationComposite('list', validator1, validator2)

  return {
    sut,
    validator1,
    validator2
  }
}

describe('ListValidationComposite', () => {
  it('should call all validators with same input, for each value in input', () => {
    const { sut, validator1, validator2 } = makeSut()
    const input = [{ count: 10 }, { count: 5 }]

    sut.validate(input)

    expect(validator1.validate).toHaveBeenNthCalledWith(1, input[0])
    expect(validator2.validate).toHaveBeenNthCalledWith(1, input[0])
    expect(validator1.validate).toHaveBeenNthCalledWith(2, input[1])
    expect(validator2.validate).toHaveBeenNthCalledWith(2, input[1])
  })

  it('should return the error on the first invalid value of input', () => {
    const { sut, validator1 } = makeSut()
    validator1.validate
    .mockReturnValueOnce([])
    .mockReturnValueOnce(['count must be of type number'])

    const response = sut.validate([
      { count: 2 },
      { count: '10' },
      { count: 5 }
    ])

    expect(response).toEqual([
      'list[1].count must be of type number'
    ])
  })
})
