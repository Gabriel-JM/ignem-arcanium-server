import { FakeValidator } from '@/tests/unit/mocks/index.js'
import { NestedObjectValidationComposite } from '@/validation/composites/index.js'

function makeSut() {
  const fakeValidator1 = new FakeValidator()
  const fakeValidator2 = new FakeValidator()
  const sut = new NestedObjectValidationComposite(
    'obj.nested',
    fakeValidator1,
    fakeValidator2
  )

  return {
    sut,
    fakeValidator1,
    fakeValidator2
  }
}

describe('DeepObjectValidationComposite', () => {
  it('should add the correct path in error messages', () => {
    const { sut, fakeValidator1 } = makeSut()
    fakeValidator1.validate.mockReturnValueOnce([
      'number must be of type number'
    ])

    const response = sut.validate({
      obj: {
        nested: {
          number: 1,
          string: 'text'
        }
      }
    })

    expect(response).toEqual([
      'obj.nested.number must be of type number'
    ])
  })
})
