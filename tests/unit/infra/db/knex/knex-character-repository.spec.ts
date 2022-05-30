import { KnexCharacterRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { fakeCharacter, fakeCreateCharacterParams, mockKnex } from '@/tests/unit/mocks'
import { Knex } from 'knex'

function makeSut() {
  const fakeKnex = mockKnex('table', 'insert', 'select', 'where')
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
})
