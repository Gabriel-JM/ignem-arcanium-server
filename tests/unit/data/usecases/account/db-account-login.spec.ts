import { AccountNotFoundError } from '@/data/errors'
import { DbAccountLogin } from '@/data/usecases'
import { mockEncrypter, mockFindAccountByEmailRepository, mockHashComparer } from '@/tests/unit/mocks'

function makeSut() {
  const findAccountByEmailRepositorySpy = mockFindAccountByEmailRepository()
  const hashComparerSpy = mockHashComparer()
  const encrypterSpy = mockEncrypter()
  const sut = new DbAccountLogin(
    findAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  )

  return {
    sut,
    findAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  }
}

describe('DbAccountLogin', () => {
  const dummyLoginParams = {
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call FindAccountByEmailRepository with correct values', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut()

    await sut.login(dummyLoginParams)

    expect(findAccountByEmailRepositorySpy.findByEmail).toHaveBeenCalledWith(
      dummyLoginParams.email
    )
  })

  it('should throw an AccountNotFoundError if FindAccountByEmailRepository returns null', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut()
    findAccountByEmailRepositorySpy.findByEmail.mockResolvedValueOnce(null)

    const promise = sut.login(dummyLoginParams)

    await expect(promise).rejects.toThrowError(new AccountNotFoundError())
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, findAccountByEmailRepositorySpy, hashComparerSpy } = makeSut()

    await sut.login(dummyLoginParams)

    expect(hashComparerSpy.compare).toHaveBeenCalledWith(
      dummyLoginParams.password,
      findAccountByEmailRepositorySpy.result.password
    )
  })

  it('should throw an AccountNotFoundError if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.compare.mockResolvedValueOnce(false)

    const promise = sut.login(dummyLoginParams)

    await expect(promise).rejects.toThrowError(new AccountNotFoundError())
  })

  it('should call Encrypter with correct values', async () => {
    const { sut, findAccountByEmailRepositorySpy, encrypterSpy } = makeSut()

    await sut.login(dummyLoginParams)

    expect(encrypterSpy.encrypt).toHaveBeenCalledWith({
      id: findAccountByEmailRepositorySpy.result.id,
      name: findAccountByEmailRepositorySpy.result.name
    })
  })

  it('should return token and account name on success', async () => {
    const { sut, findAccountByEmailRepositorySpy, encrypterSpy } = makeSut()

    const response = await sut.login(dummyLoginParams)

    expect(response).toEqual({
      name: findAccountByEmailRepositorySpy.result.name,
      token: encrypterSpy.result
    })
  })
})
