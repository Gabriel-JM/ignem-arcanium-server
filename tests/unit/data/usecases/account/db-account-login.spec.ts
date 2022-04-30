import { AccountNotFoundError } from '@/data/errors'
import { DbAccountLogin } from '@/data/usecases'
import { mockFindAccountByEmailRepository } from '@/tests/unit/mocks'

function makeSut() {
  const findAccountByEmailRepositorySpy = mockFindAccountByEmailRepository()
  const sut = new DbAccountLogin(findAccountByEmailRepositorySpy)

  return {
    sut,
    findAccountByEmailRepositorySpy
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
})
