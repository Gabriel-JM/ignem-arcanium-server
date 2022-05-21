import { KnexCharacterRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { fakeCreateCharacterParams, mockKnex } from '@/tests/unit/mocks'
import { Knex } from 'knex'

function makeSut() {
  const fakeKnex = mockKnex('table', 'insert')
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
      const dummyParams = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }

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
})
