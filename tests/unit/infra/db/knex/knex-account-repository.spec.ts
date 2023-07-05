import { KnexAccountRepository } from '@/infra/db/index.ts'
import { KnexHelper } from '@/infra/db/knex/knex-helper.ts'
import { mockKnex } from '@/tests/unit/mocks/index.ts'
import { Knex } from 'knex'

function makeSut() {
  const fakeKnex = mockKnex('table', 'insert', 'select', 'where', 'first', 'raw')
  const knexHelper = new KnexHelper(fakeKnex as unknown as Knex)
  const sut = new KnexAccountRepository(knexHelper)

  return {
    sut,
    knexHelper,
    fakeKnex
  }
}

describe('KnexAccountRepository', () => {
  describe('create()', () => {
    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()
      const dummyParams = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }

      await sut.create(dummyParams)

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.insert).toHaveBeenCalledWith({
        id: dummyParams.id,
        name: dummyParams.name,
        email: dummyParams.email,
        password: dummyParams.password
      })
    })
  })

  describe('findByEmail()', () => {
    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()

      await sut.findByEmail('any_email')

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.select).toHaveBeenCalledWith()
      expect(fakeKnex.where).toHaveBeenCalledWith({ email: 'any_email' })
      expect(fakeKnex.first).toHaveBeenCalledWith()
    })

    it('should return null if no account is found', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce(undefined)

      const response = await sut.findByEmail('any_email')

      expect(response).toBeNull()
    })

    it('should return the account data on success', async () => {
      const { sut, fakeKnex } = makeSut()
      const fakeAccount = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
      fakeKnex.first.mockResolvedValueOnce(fakeAccount)

      const response = await sut.findByEmail('any_email')

      expect(response).toEqual(fakeAccount)
    })
  })

  describe('checkByEmail()', () => {
    it('should call knex methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()

      await sut.checkByEmail('any_email')

      expect(fakeKnex.table).toHaveBeenCalledWith('accounts')
      expect(fakeKnex.select).toHaveBeenCalledWith(fakeKnex)
      expect(fakeKnex.raw).toHaveBeenCalledWith('1')
      expect(fakeKnex.where).toHaveBeenCalledWith({ email: 'any_email' })
      expect(fakeKnex.first).toHaveBeenCalledWith()
    })

    it('should return true if query returns a response', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce({ '?column?': 1 })

      const response = await sut.checkByEmail('any_email')

      expect(response).toBe(true)
    })

    it('should return false if query returns undefined', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce(undefined)

      const response = await sut.checkByEmail('any_email')

      expect(response).toBe(false)
    })
  })

  describe('findById()', () => {
    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()

      await sut.findById('any_id')

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.where).toHaveBeenCalledWith({ id: 'any_id' })
      expect(fakeKnex.first).toHaveBeenCalledWith()
    })

    it('should return null if no account is found', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce(undefined)

      const response = await sut.findById('any_id')

      expect(response).toBeNull()
    })

    it('should return the account data on success', async () => {
      const { sut, fakeKnex } = makeSut()
      const fakeAccount = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
      fakeKnex.first.mockResolvedValueOnce(fakeAccount)

      const response = await sut.findById('any_id')

      expect(response).toEqual(fakeAccount)
    })
  })
})
