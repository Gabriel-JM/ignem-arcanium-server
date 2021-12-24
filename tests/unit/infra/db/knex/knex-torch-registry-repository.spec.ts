import { KnexTorchRegistryRepository } from '@/infra/db'
import { knexHelper } from '@/infra/db/knex/knex-helper'
import { Knex } from 'knex'

function makeSut() {
  const tableSpy = jest.spyOn(knexHelper, 'table')
  const sut = new KnexTorchRegistryRepository()

  return {
    sut,
    tableSpy
  }
}

describe('KnexTorchRegistryRepository', () => {
  describe('create()', () => {
    it('should call KnexHelper methods with correct values', async () => {
      const { sut, tableSpy } = makeSut()
      const dummyParams = {
        id: 'any_id',
        characterName: 'any_char_name',
        torchCount: 1,
        torchCharge: 3,
        isLit: true
      }

      const insertSpy = { insert: jest.fn() }
      tableSpy.mockImplementationOnce(() => (insertSpy as unknown as Knex.QueryBuilder))

      await sut.create(dummyParams)

      expect(tableSpy).toHaveBeenCalledWith(sut.tableName)
      expect(insertSpy.insert).toHaveBeenCalledWith({
        id: dummyParams.id,
        character_name: dummyParams.characterName,
        torch_count: dummyParams.torchCount,
        torch_charge: dummyParams.torchCharge,
        is_lit: dummyParams.isLit
      })
    })
  })

  describe('findAll()', () => {
    it('should calls knex methods with correct values', async () => {
      const { sut, tableSpy } = makeSut()
    })
  })
})
