import bcrypt from 'bcrypt'
import { BcryptHasher } from '@/infra/cryptography'

const hashSpy = jest.spyOn(bcrypt, 'hash')

hashSpy.mockImplementation(() => 'hashed_value')

const compareSpy = jest.spyOn(bcrypt, 'compare')

compareSpy.mockImplementation(() => true)

describe('Bcrypt Adapter', () => {
  const salt = 12

  describe('hash()', () => {
    it('should call bcrypt.hash with correct value', async () => {
      const sut = new BcryptHasher(salt)
      await sut.hash('any_value')

      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return a valid hash value on hash success', async () => {
      const sut = new BcryptHasher(salt)
      const hash = await sut.hash('any_value')

      expect(hash).toBe('hashed_value')
    })

    it('should throws if bcrypt.hash throws', async () => {
      const sut = new BcryptHasher(salt)
      hashSpy.mockImplementationOnce(() => { throw new Error() })

      await expect(sut.hash('any_value')).rejects.toThrow()
    })
  })
})
