import { LocalCreateAccessToken } from '@/data/usecases/account/local-create-access-token'
import { mockEncrypter } from '@/tests/unit/mocks'

function makeSut() {
  const encrypterSpy = mockEncrypter()
  const sut = new LocalCreateAccessToken(encrypterSpy)

  return {
    sut,
    encrypterSpy
  }
}

describe('LocalCreateAccessToken', () => {
  it('should call Encrypter with correct values', async () => {
    const { sut, encrypterSpy } = makeSut()

    await sut.create('any_account_id')

    expect(encrypterSpy.encrypt).toHaveBeenCalledWith('any_account_id')
  })

  it('should return token and account name on success', async () => {
    const { sut, encrypterSpy } = makeSut()

    const response = await sut.create('any_account_id')

    expect(response).toBe(encrypterSpy.result)
  })
})
