import { DbCreateAccount } from '@/data/usecases'
import { mockUniqueIdGenerator } from '@/tests/unit/data/helpers'
import {
  mockCreateAccountRepository,
  mockTextHasher
} from '@/tests/unit/mocks'

function makeSut() {
  const uniqueIdGeneratorSpy = mockUniqueIdGenerator()
  const textHasherSpy = mockTextHasher()
  const createAccountRepositorySpy = mockCreateAccountRepository()
  const sut = new DbCreateAccount(
    uniqueIdGeneratorSpy,
    textHasherSpy,
    createAccountRepositorySpy
  )

  return {
    sut,
    uniqueIdGeneratorSpy,
    textHasherSpy,
    createAccountRepositorySpy
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

  it('should call CreateAccountRepository with correct values', async () => {
    const {
      sut,
      uniqueIdGeneratorSpy,
      textHasherSpy,
      createAccountRepositorySpy
    } = makeSut()

    await sut.create(dummyCreateParams)

    expect(createAccountRepositorySpy.create).toHaveBeenCalledWith({
      id: uniqueIdGeneratorSpy.result,
      name: dummyCreateParams.name,
      email: dummyCreateParams.email,
      password: textHasherSpy.result
    })
  })

  it('should return id on success', async () => {
    const { sut, uniqueIdGeneratorSpy } = makeSut()

    const response = await sut.create(dummyCreateParams)

    expect(response).toBe(uniqueIdGeneratorSpy.result)
  })
})
