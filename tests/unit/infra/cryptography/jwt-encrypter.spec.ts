import jwt from 'jsonwebtoken'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'

function makeSut() {
  const signSpy = jest.spyOn(jwt, 'sign')
  signSpy.mockImplementation(() => 'encrypted_token')
  const verifySpy = jest.spyOn(jwt, 'verify')
  verifySpy.mockImplementation(() => ({}))

  const sut = new JwtEncrypter('secret')

  return {
    sut,
    signSpy,
    verifySpy
  }
}

describe('JwtEncrypter', () => {
  describe('encrypt()', () => {
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

  describe('verify()', () => {
    it('should call JWT verify method with correct values', () => {
      const { sut, verifySpy } = makeSut()

      sut.verify('any_token')

      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    it('should return true if verify succeeds', () => {
      const { sut } = makeSut()

      const response = sut.verify('any_token')

      expect(response).toBe(true)
    })

    it('should return false if verify fails', () => {
      const { sut, verifySpy } = makeSut()
      verifySpy.mockImplementationOnce(() => {
        throw new Error()
      })

      const response = sut.verify('any_token')

      expect(response).toBe(false)
    })
  })
})
