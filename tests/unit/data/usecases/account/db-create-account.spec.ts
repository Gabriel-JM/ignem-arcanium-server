import { DbCreateAccount } from '@/data/usecases'
import { mockTextHasher, mockUniqueIdGenerator } from '@/tests/unit/data/helpers'

function makeSut() {
  const uniqueIdGeneratorSpy = mockUniqueIdGenerator()
  const textHasherSpy = mockTextHasher()
  const sut = new DbCreateAccount(uniqueIdGeneratorSpy, textHasherSpy)

  return {
    sut,
    uniqueIdGeneratorSpy,
    textHasherSpy
  }
}

describe('DbCreateAccount', () => {
  const dummyCreateParams = {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call UniqueIdGenerator with correct values', async () => {
    const { sut, uniqueIdGeneratorSpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(uniqueIdGeneratorSpy.generate).toHaveBeenCalledWith()
  })

  it('should call TextHasher with correct values', async () => {
    const { sut, textHasherSpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(textHasherSpy.hash).toHaveBeenCalledWith(dummyCreateParams.password)
  })
})
