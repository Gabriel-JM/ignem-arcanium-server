import bcrypt from 'bcrypt'
import { BcryptHasher } from '@/infra/cryptography/index.ts'

const hashSpy = vi.spyOn(bcrypt, 'hash')

hashSpy.mockImplementation(() => 'hashed_value')

const compareSpy = vi.spyOn(bcrypt, 'compare')

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

  describe('compare()', () => {
    it('should call bcrypt.compare with correct value', async () => {
      const sut = new BcryptHasher(salt)
      await sut.compare('any_value', 'value_to_compare')

      expect(compareSpy).toHaveBeenCalledWith('any_value', 'value_to_compare')
    })

    it('should return true on compare success', async () => {
      const sut = new BcryptHasher(salt)
      const isEqual = await sut.compare('any_value', 'value_to_compare')

      expect(isEqual).toBe(true)
    })

    it('should throws if bcrypt.compare throws', async () => {
      const sut = new BcryptHasher(salt)
      compareSpy.mockImplementationOnce(() => { throw new Error() })

      await expect(sut.compare('any_value', 'value_to_compare')).rejects.toThrow()
    })
  })
})
