import { InvalidAccessTokenError } from '@/data/errors'
import { LocalVerifyToken } from '@/data/usecases'
import { mockEncryptionVerifier } from '@/tests/unit/mocks'

function makeSut() {
  const encryptionVerifierSpy = mockEncryptionVerifier()
  const sut = new LocalVerifyToken(encryptionVerifierSpy)

  return {
    sut,
    encryptionVerifierSpy
  }
}

describe('LocalVerifyToken', () => {
  const dummyVerifyParams = {
    token: 'any_token'
  }

  it('should call EncryptionVerifier with correct values', () => {
    const { sut, encryptionVerifierSpy } = makeSut()

    sut.verify(dummyVerifyParams)

    expect(encryptionVerifierSpy.verify).toHaveBeenCalledWith('any_token')
  })

  it('should throw an InvalidAccessTokenError if EncryptionVerifier returns false', () => {
    const { sut, encryptionVerifierSpy } = makeSut()
    encryptionVerifierSpy.verify.mockReturnValueOnce(false)

    expect(() => sut.verify(dummyVerifyParams))
      .toThrowError(new InvalidAccessTokenError())
  })
})
