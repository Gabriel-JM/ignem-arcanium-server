import { KnexCharacterRepository } from '@/infra/db/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { fakeCharacter, fakeCreateCharacterParams, mockKnex, mockUniqueIdGenerator } from '@/tests/unit/mocks/index.js'
import { Knex } from 'knex'

const creaturesFields = ([
  'name',
  'icon',
  'alignment',
  'description',
  'gold',
  'status_effects',
  'hp',
  'mp',
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
]).map(field => `creatures.${field}`)

function makeSut() {
  const fakeKnex = mockKnex(
    'table',
    'insert',
    'select',
    'where',
    'update',
    'raw',
    'join',
    'first',
    'delete',
    'transacting',
    'transaction',
    'commit',
    'rollback'
  )
  const knexHelper = new KnexHelper(fakeKnex as unknown as Knex)
  const uniqueIdGeneratorSpy = mockUniqueIdGenerator()
  const sut = new KnexCharacterRepository(knexHelper, uniqueIdGeneratorSpy)

  return {
    sut,
    knexHelper,
    fakeKnex,
    uniqueIdGeneratorSpy
  }
}

describe('KnexCharacterRepository', () => {
  describe('create()', () => {
    const dummyCreateParams = {
      ...fakeCreateCharacterParams(),
      id: 'any_id',
      inventoryId: 'any_inventory_id',
      statusEffects: [],
      hp: 12,
      mp: 12
    }

    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex, uniqueIdGeneratorSpy } = makeSut()

      await sut.create(dummyCreateParams)

      expect(fakeKnex.table).toHaveBeenNthCalledWith(1, 'creatures')
      expect(fakeKnex.insert).toHaveBeenNthCalledWith(1, {
        id: uniqueIdGeneratorSpy.result,
        name: dummyCreateParams.name,
        icon: dummyCreateParams.icon,
        alignment: dummyCreateParams.alignment,
        description: dummyCreateParams.description,
        gold: dummyCreateParams.gold,
        status_effects: [],
        hp: dummyCreateParams.hp,
        mp: dummyCreateParams.mp,
        strength: dummyCreateParams.strength,
        dexterity: dummyCreateParams.dexterity,
        constitution: dummyCreateParams.constitution,
        intelligence: dummyCreateParams.intelligence,
        wisdom: dummyCreateParams.wisdom,
        charisma: dummyCreateParams.charisma
      })
      expect(fakeKnex.table).toHaveBeenNthCalledWith(2, sut.tableName)
      expect(fakeKnex.insert).toHaveBeenNthCalledWith(2, {
        id: dummyCreateParams.id,
        account_id: dummyCreateParams.accountId,
        creature_id: uniqueIdGeneratorSpy.result,
        level: dummyCreateParams.level,
        character_points: dummyCreateParams.characterPoints,
        experience: 0
      })
      expect(fakeKnex.table).toHaveBeenNthCalledWith(3, 'inventories')
      expect(fakeKnex.insert).toHaveBeenNthCalledWith(3, {
        id: dummyCreateParams.inventoryId,
        size: 200
      })
    })
  })

  describe('findAll()', () => {
    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.where.mockResolvedValueOnce([])

      await sut.findAll('any_account_id')

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.select).toHaveBeenCalledWith(
        'characters.*',
        ...creaturesFields
      )
      expect(fakeKnex.where).toHaveBeenCalledWith({ account_id: 'any_account_id' })
    })

    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()
      const fakeChar = fakeCharacter()
      fakeKnex.where.mockResolvedValueOnce([{
        ...fakeChar,
        account_id: fakeChar.accountId,
        character_points: fakeChar.characterPoints
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
