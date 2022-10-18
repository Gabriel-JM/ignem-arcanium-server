import { EmailAlreadyInUseError } from '@/data/errors/index.js'
import { DbCreateAccount } from '@/data/usecases/index.js'
import { mockCheckAccountByEmailRepository, mockUniqueIdGenerator } from '@/tests/unit/mocks/index.js'
import {
  mockCreateAccountRepository,
  mockEncrypter,
  mockTextHasher
} from '@/tests/unit/mocks/index.js'

function makeSut() {
  const checkAccountByEmailRepositorySpy = mockCheckAccountByEmailRepository()
  const uniqueIdGeneratorSpy = mockUniqueIdGenerator()
  const textHasherSpy = mockTextHasher()
  const createAccountRepositorySpy = mockCreateAccountRepository()
  const encrypterSpy = mockEncrypter()
  const sut = new DbCreateAccount(
    checkAccountByEmailRepositorySpy,
    uniqueIdGeneratorSpy,
    textHasherSpy,
    createAccountRepositorySpy,
    encrypterSpy
  )

  return {
    sut,
    checkAccountByEmailRepositorySpy,
    uniqueIdGeneratorSpy,
    textHasherSpy,
    createAccountRepositorySpy,
    encrypterSpy
  }
}

describe('DbCreateAccount', () => {
  const dummyCreateParams = {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call CheckAccountByEmailRepository with correct values', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(checkAccountByEmailRepositorySpy.checkByEmail).toHaveBeenCalledWith(
      dummyCreateParams.email
    )
  })

  it('should throw EmailAlreadyInUseError if the provided email is already in use', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut.create(dummyCreateParams)

    await expect(promise).rejects.toThrowError(new EmailAlreadyInUseError())
  })

  it('should call UniqueIdGenerator with correct values', async () => {
    const { sut, uniqueIdGeneratorSpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(uniqueIdGeneratorSpy.generate).toHaveBeenCalledWith('accounts')
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

  it('should call Encrypter with correct values', async () => {
    const { sut, uniqueIdGeneratorSpy, encrypterSpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(encrypterSpy.encrypt).toHaveBeenCalledWith({
      id: uniqueIdGeneratorSpy.result,
      name: dummyCreateParams.name
    })
  })

  it('should return token and account name on success', async () => {
    const { sut, encrypterSpy } = makeSut()

    const response = await sut.create(dummyCreateParams)

    expect(response).toEqual({
      name: dummyCreateParams.name,
      token: encrypterSpy.result
    })
  })
})
