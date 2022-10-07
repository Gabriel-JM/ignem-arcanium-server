import { ListValidationComposite } from '@/validation/composites/index.js'
import { Validator } from '@/validation/protocols/index.js'

class FakeValidator implements Validator {
  result: string[] = []
  validate = vi.fn<[], string[]>(() => this.result)
}

function makeSut(path = 'list') {
  const validator1 = new FakeValidator()
  const validator2 = new FakeValidator()
  const sut = new ListValidationComposite(path, validator1, validator2)

  return {
    sut,
    validator1,
    validator2
  }
}

describe('ListValidationComposite', () => {
  it('should call all validators with same input, for each value in input', () => {
    const { sut, validator1, validator2 } = makeSut()
    const input = { list: [{ count: 10 }, { count: 5 }] }

    sut.validate(input)

    expect(validator1.validate).toHaveBeenNthCalledWith(1, input.list[0])
    expect(validator2.validate).toHaveBeenNthCalledWith(1, input.list[0])
    expect(validator1.validate).toHaveBeenNthCalledWith(2, input.list[1])
    expect(validator2.validate).toHaveBeenNthCalledWith(2, input.list[1])
  })

  it('should return the error on the first invalid value of input', () => {
    const { sut, validator1 } = makeSut()
    validator1.validate
      .mockReturnValueOnce([])
      .mockReturnValueOnce(['count must be of type number'])

    const response = sut.validate({
      list: [
        { count: 2 },
        { count: '10' },
        { count: 5 }
      ]
    })

    expect(response).toEqual([
      'list[1].count must be of type number'
    ])
  })

  it('should return the correct error message on nested objects', () => {
    const { sut, validator1 } = makeSut('object.list')
    validator1.validate
      .mockReturnValueOnce(['count must be of type number'])

    const response = sut.validate({
      object: {
        list: [
          { count: '10' },
          { count: 2 },
          { count: 5 }
        ]
      }
    })

    expect(response).toEqual([
      'object.list[0].count must be of type number'
    ])
  })
})
