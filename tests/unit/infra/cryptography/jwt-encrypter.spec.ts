import jwt from 'jsonwebtoken'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'

function makeSut() {
  const signSpy = jest.spyOn(jwt, 'sign')
  signSpy.mockImplementation(() => 'encrypted_token')

  const sut = new JwtEncrypter('secret')

  return {
    sut,
    signSpy
  }
}

describe('JwtEncrypter', () => {
  it('should call JWT sign method with correct values', async () => {
    const { sut, signSpy } = makeSut()

    await sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith(
      { id: 'any_id' },
      'secret',
      { expiresIn: '8d' }
    )
  })

  it('should return an encrypted token on success', async () => {
    const { sut } = makeSut()

    const response = await sut.encrypt('any_id')

    expect(response).toBe('encrypted_token')
  })
})
