import { KnexAccountRepository, KnexTorchRegistryRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { mockKnex } from '@/tests/unit/infra/helpers'
import { Knex } from 'knex'

function makeSut() {
  const fakeKnex = mockKnex('table', 'insert')
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
})
