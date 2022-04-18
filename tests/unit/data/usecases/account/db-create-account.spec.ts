import { DbCreateAccount } from '@/data/usecases'
import { mockUniqueIdGenerator } from '@/tests/unit/data/helpers'

function makeSut() {
  const uniqueIdGeneratorSpy = mockUniqueIdGenerator()
  const sut = new DbCreateAccount(uniqueIdGeneratorSpy)

  return {
    sut,
    uniqueIdGeneratorSpy
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
})
