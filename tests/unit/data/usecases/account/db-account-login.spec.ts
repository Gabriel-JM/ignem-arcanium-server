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
})
