import { InvalidAccessTokenError } from '@/data/errors'
import { DbLoadAccountByToken } from '@/data/usecases'
import { fakeAccount, mockDecrypter, mockFindAccountByIdRepository } from '@/tests/unit/mocks'

function makeSut() {
  const decrypterSpy = mockDecrypter()
  const findAccountByIdRepositorySpy = mockFindAccountByIdRepository()
  const sut = new DbLoadAccountByToken(decrypterSpy, findAccountByIdRepositorySpy)

  return {
    sut,
    decrypterSpy,
    findAccountByIdRepositorySpy
  }
}

describe('DbLoadAccountByToken', () => {
  it('should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()

    await sut.load('any_token')

    expect(decrypterSpy.decrypt).toHaveBeenCalledWith('any_token')
  })

  it('should throw an InvalidAccessTokenError if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.decrypt.mockResolvedValueOnce(null as any)

    const promise = sut.load('any_token')

    await expect(promise).rejects.toThrowError(new InvalidAccessTokenError())
  })

  it('should call FindAccountByIdRepository with correct values', async () => {
    const { sut, decrypterSpy, findAccountByIdRepositorySpy } = makeSut()

    await sut.load('any_token')

    expect(findAccountByIdRepositorySpy.findById).toHaveBeenCalledWith(
      decrypterSpy.result.id
    )
  })

  it('should throw an InvalidAccessTokenError if Repository returns null', async () => {
    const { sut, findAccountByIdRepositorySpy } = makeSut()
    findAccountByIdRepositorySpy.findById.mockResolvedValueOnce(null as any)

    const promise = sut.load('any_token')

    await expect(promise).rejects.toThrowError(new InvalidAccessTokenError())
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()

    const response = await sut.load('any_token')

    expect(response).toEqual(fakeAccount())
  })
})
