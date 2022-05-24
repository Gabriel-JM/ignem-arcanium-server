import { InvalidAccessTokenError } from '@/data/errors'
import { DbLoadAccountByToken } from '@/data/usecases'
import { mockDecrypter } from '@/tests/unit/mocks'

function makeSut() {
  const decrypterSpy = mockDecrypter()
  const sut = new DbLoadAccountByToken(decrypterSpy)

  return {
    sut,
    decrypterSpy
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
})
