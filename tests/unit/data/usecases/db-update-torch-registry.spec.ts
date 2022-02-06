import { DbUpdateTorchRegistry } from '@/data/usecases/db-update-torch-registry'
import { mockFindTorchRegistryByIdRepository, mockUpdateTorchRegistryRepository } from '@/tests/unit/data/helpers'

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

    test('a string starting with + and the values', async () => {
      const { sut, updateTorchRegistryRepositorySpy } = makeSut()
      const updateParams = {
        id: 'any_id',
        torchCount: 2
      }

      await sut.update(updateParams)

      expect(updateTorchRegistryRepositorySpy.update).toHaveBeenCalledWith({
        ...updateParams,
        torchCharge: undefined,
        isLit: undefined
      })
    })
  })

  it('should call FindTorchRegistryByIdRepository, if torchCount or torchCharge are strings', async () => {
    const { sut, findTorchRegistryByIdRepositorySpy } = makeSut()

    await sut.update({
      id: 'any_id',
      torchCount: '+2'
    })

    expect(findTorchRegistryByIdRepositorySpy.findById).toHaveBeenCalledWith('any_id')
  })
})
