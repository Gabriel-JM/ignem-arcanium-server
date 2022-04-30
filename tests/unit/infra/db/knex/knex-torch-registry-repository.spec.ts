import { KnexTorchRegistryRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { mockKnex } from '@/tests/unit/mocks'
import { Knex } from 'knex'

function makeSut() {
  const fakeKnex = mockKnex(
    'table',
    'select',
    'insert',
    'where',
    'update',
    'first',
    'transaction',
    'transacting',
    'commit',
    'rollback'
  )
  const knexHelper = new KnexHelper(fakeKnex as unknown as Knex)
  const sut = new KnexTorchRegistryRepository(knexHelper)

  return {
    sut,
    knexHelper,
    fakeKnex
  }
}

describe('KnexTorchRegistryRepository', () => {
  describe('create()', () => {
    it('should call KnexHelper methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()
      const dummyParams = {
        id: 'any_id',
        characterName: 'any_char_name',
        torchCount: 1,
        torchCharge: 3,
        isLit: true
      }

      await sut.create(dummyParams)

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.insert).toHaveBeenCalledWith({
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
      const { sut, fakeKnex } = makeSut()
      fakeKnex.select.mockImplementationOnce(() => Promise.resolve([]))

      await sut.findAll()

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.select).toHaveBeenCalledWith(
        'id',
        'character_name',
        'torch_count',
        'torch_charge',
        'is_lit'
      )
    })

    it('should return the correct mapped object', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.select.mockImplementationOnce(() => Promise.resolve([{
        id: 'any_id',
        torch_count: 1,
        torch_charge: 4,
        is_lit: 0
      }]))

      const response = await sut.findAll()

      expect(response).toEqual([{
        id: 'any_id',
        torchCount: 1,
        torchCharge: 4,
        isLit: false
      }])
    })
  })

  describe('findById()', () => {
    it('should call knex methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()

      await sut.findById('any_id')

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.where).toHaveBeenCalledWith({ id: 'any_id' })
      expect(fakeKnex.first).toHaveBeenCalledWith()
    })

    it('should return the correct mapped values from database, if has an result', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce({
        id: 'any_id',
        character_name: 'any_name',
        torch_count: 2,
        torch_charge: 3,
        is_lit: 1
      })

      const response = await sut.findById('any_id')

      expect(response).toEqual({
        id: 'any_id',
        characterName: 'any_name',
        torchCount: 2,
        torchCharge: 3,
        isLit: true
      })
    })

    it('should return the correct mapped values from database, if has no result', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.first.mockResolvedValueOnce(null)

      const response = await sut.findById('any_id')

      expect(response).toEqual(null)
    })
  })

  describe('update()', () => {
    it('should call knex methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()
      const input = {
        id: 'any_id',
        torchCount: 3
      }

      await sut.update(input)

      expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
      expect(fakeKnex.where).toHaveBeenCalledWith({ id: input.id })
      expect(fakeKnex.update).toHaveBeenCalledWith({ torch_count: input.torchCount })
    })
  })

  describe('updateMany()', () => {
    it('should call knex methods with correct values', async () => {
      const { sut, fakeKnex } = makeSut()

      const input = [{
        id: 'any_id',
        isLit: true
      }, {
        id: 'any_id',
        torchCount: 1
      }, {
        id: 'any_id',
        torchCharge: 4
      }]

      const expectedUpdateParams = [
        { is_lit: true },
        { torch_count: 1 },
        { torch_charge: 4 }
      ]

      await sut.updateMany(input)
      
      for (const i in input) {
        const index = Number(i)
        const inputData = input[index]

        expect(fakeKnex.table).toHaveBeenCalledWith(sut.tableName)
        expect(fakeKnex.where).toHaveBeenNthCalledWith(index + 1, {
          id: inputData.id
        })
        expect(fakeKnex.update).toHaveBeenNthCalledWith(
          index + 1,
          expectedUpdateParams[index]
        )
        expect(fakeKnex.commit).toHaveBeenCalledWith()
      }
    })

    it('should call rollback knex method if something went wrong', async () => {
      const { sut, fakeKnex } = makeSut()
      fakeKnex.update.mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.updateMany([{ id: 'any_id', isLit: true }])

      await expect(promise).rejects.toThrowError(Error)
      expect(fakeKnex.rollback).toHaveBeenCalledWith()
    })
  })
})
