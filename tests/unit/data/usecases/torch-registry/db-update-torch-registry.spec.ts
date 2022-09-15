import { InvalidTorchAdditionValueError, TorchRegistryNotFoundError } from '@/data/errors/index.js'
import { DbUpdateTorchRegistry } from '@/data/usecases/index.js'
import {
  mockFindTorchRegistryByIdRepository,
  mockUpdateTorchRegistryRepository
} from '@/tests/unit/mocks/index.js'

function makeSut() {
  const updateTorchRegistryRepositorySpy = mockUpdateTorchRegistryRepository()
  const findTorchRegistryByIdRepositorySpy = mockFindTorchRegistryByIdRepository()
  const sut = new DbUpdateTorchRegistry(
    updateTorchRegistryRepositorySpy,
    findTorchRegistryByIdRepositorySpy
  )

  return {
    sut,
    updateTorchRegistryRepositorySpy,
    findTorchRegistryByIdRepositorySpy
  }
}

describe('DbUpdateTorchRegistry', () => {
  describe('should call UpdateTorchRegistryRepository with correct values', () => {
    test('literal numbers', async () => {
      const { sut, updateTorchRegistryRepositorySpy } = makeSut()
      const updateParams = {
        id: 'any_id',
        torchCount: 2,
        torchCharge: 4,
        isLit: false
      }

      await sut.update(updateParams)

      expect(updateTorchRegistryRepositorySpy.update).toHaveBeenCalledWith(updateParams)
    })

    test('torchCount and torchCharge as a string starting with + or - and the values', async () => {
      const { sut, updateTorchRegistryRepositorySpy, findTorchRegistryByIdRepositorySpy } = makeSut()
      const { result: torchData } = findTorchRegistryByIdRepositorySpy;
      const updateParams = {
        id: 'any_id',
        torchCount: '+2',
        torchCharge: '-1'
      }

      Reflect.deleteProperty(torchData, 'characterName')

      await sut.update(updateParams)

      expect(updateTorchRegistryRepositorySpy.update).toHaveBeenCalledWith({
        ...torchData,
        torchCount: torchData.torchCount + 2,
        torchCharge: torchData.torchCharge - 1
      })
    })
  })

  describe('if torchCount or torchCharge are strings', () => {
    it('should call FindTorchRegistryByIdRepository with correct values', async () => {
      const { sut, findTorchRegistryByIdRepositorySpy } = makeSut()
  
      await sut.update({
        id: 'any_id',
        torchCount: '+2'
      })
  
      expect(findTorchRegistryByIdRepositorySpy.findById).toHaveBeenCalledWith('any_id')
    })
  
    it('should throw a TorchRegistryNotFoundError if FindTorchRegistryByIdRepository returns null', async () => {
      const { sut, findTorchRegistryByIdRepositorySpy } = makeSut()
      findTorchRegistryByIdRepositorySpy.findById.mockResolvedValueOnce(null)

      const promise = sut.update({
        id: 'wrong_id',
        torchCount: '+1'
      })

      await expect(promise).rejects.toThrowError(new TorchRegistryNotFoundError({
        id: 'wrong_id'
      }))
    })

    it('should throw an InvalidTorchAdditionValueError if torchCount string is invalid', async () => {
      const { sut } = makeSut()

      const promise = sut.update({
        id: 'any_id',
        torchCount: 'wrong_value'
      })

      await expect(promise).rejects.toThrowError(new InvalidTorchAdditionValueError('wrong_value'))
    })

    it('should throw an InvalidTorchAdditionValueError if torchCharge string is invalid', async () => {
      const { sut } = makeSut()

      const promise = sut.update({
        id: 'any_id',
        torchCharge: 'wrong_value'
      })

      await expect(promise).rejects.toThrowError(new InvalidTorchAdditionValueError('wrong_value'))
    })
  })
})
