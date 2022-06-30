import { KnexCharacterRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { fakeCharacter, fakeCreateCharacterParams, mockKnex } from '@/tests/unit/mocks'
import { Knex } from 'knex'

function makeSut() {
  const fakeKnex = mockKnex(
    'table',
    'insert',
    'select',
    'where',
    'update',
    'raw',
    'first',
    'delete'
  )
  const knexHelper = new KnexHelper(fakeKnex as unknown as Knex)
  const sut = new KnexCharacterRepository(knexHelper)

  return {
    sut,
    knexHelper,
    fakeKnex
  }
}

describe('KnexCharacterRepository', () => {
  describe('create()', () => {
    const dummyCreateParams = {
      ...fakeCreateCharacterParams(),
      id: 'any_id'
    }

    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()

      await sut.create(dummyCreateParams)

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.insert).toHaveBeenCalledWith({
        id: dummyCreateParams.id,
        account_id: dummyCreateParams.accountId,
        name: dummyCreateParams.name,
        icon: dummyCreateParams.icon,
        level: dummyCreateParams.level,
        gold: dummyCreateParams.gold,
        hp: dummyCreateParams.hp,
        mp: dummyCreateParams.mp,
        strength: dummyCreateParams.strength,
        dexterity: dummyCreateParams.dexterity,
        constitution: dummyCreateParams.constitution,
        intelligence: dummyCreateParams.intelligence,
        wisdom: dummyCreateParams.wisdom,
        charism: dummyCreateParams.charism
      })
    })
  })

  describe('findAll()', () => {
    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.where.mockResolvedValueOnce([])

      await sut.findAll('any_account_id')

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.select).toHaveBeenCalledWith()
      expect(fakeKnex.where).toHaveBeenCalledWith({ account_id: 'any_account_id' })
    })

    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.where.mockResolvedValueOnce([{
        ...fakeCharacter(),
        account_id: 'any_account_id'
      }])

      const response = await sut.findAll('any_account_id')

      expect(response).toEqual([fakeCharacter()])
    })
  })

  describe('check()', () => {
    const checkParams = {
      id: 'any_id',
      accountId: 'any_account_id'
    }

    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce([])

      await sut.check(checkParams)

      expect(fakeKnex.table).toHaveBeenCalledWith('characters')
      expect(fakeKnex.select).toHaveBeenCalledWith(fakeKnex)
      expect(fakeKnex.raw).toHaveBeenCalledWith('1')
      expect(fakeKnex.where).toHaveBeenCalledWith({
        id: checkParams.id,
        account_id: checkParams.accountId
      })
      expect(fakeKnex.first).toHaveBeenCalledWith()
    })

    it('should return true if query returns a response', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce({ '?column?': 1 })

      const response = await sut.check(checkParams)

      expect(response).toBe(true)
    })

    it('should return false if query returns undefined', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce(undefined)

      const response = await sut.check(checkParams)

      expect(response).toBe(false)
    })
  })

  describe('delete()', () => {
    const deleteParams = {
      id: 'any_id',
      accountId: 'any_account_id'
    }

    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()

      await sut.delete(deleteParams)

      expect(fakeKnex.table).toHaveBeenCalledWith('characters')
      expect(fakeKnex.where).toHaveBeenCalledWith({
        id: deleteParams.id,
        account_id: deleteParams.accountId
      })
      expect(fakeKnex.delete).toHaveBeenCalledWith()
    })
  })

  describe('update()', () => {
    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()

      await sut.update({
        id: 'any_id',
        accountId: 'any_account_id',
        gold: 100
      })

      expect(fakeKnex.table).toHaveBeenCalledWith('characters')
      expect(fakeKnex.where).toHaveBeenCalledWith({
        id: 'any_id',
        account_id: 'any_account_id'
      })
      expect(fakeKnex.update).toHaveBeenCalledWith({ gold: 100 })
    })
  })
})
