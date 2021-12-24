import { DbConsumeAllTorchesCharge } from '@/data/usecases/db-consume-all-torches-charge'
import { mockfindAllTorchRegistriesRepository, mockUpdateManyTorchRegistriesRepository } from '@/tests/unit/data/helpers'

function makeSut() {
  const findAllTorchRegistriesRepositorySpy = mockfindAllTorchRegistriesRepository()
  const updateManyTorchRegistriesRepositorySpy = mockUpdateManyTorchRegistriesRepository()
  const sut = new DbConsumeAllTorchesCharge(
    findAllTorchRegistriesRepositorySpy,
    updateManyTorchRegistriesRepositorySpy
  )

  return {
    sut,
    findAllTorchRegistriesRepositorySpy,
    updateManyTorchRegistriesRepositorySpy
  }
}

describe('DbConsumeAllTorchesCharge', () => {
  it('should call FindAllTorchRegistriesRepository', async () => {
    const { sut, findAllTorchRegistriesRepositorySpy } = makeSut()
    
    await sut.consumeAll()

    expect(findAllTorchRegistriesRepositorySpy.findAll).toHaveBeenCalledWith()
  })

  it('should call UpdateManyTorchRegistriesRepository with correct consumed values', async () => {
    const { sut, findAllTorchRegistriesRepositorySpy, updateManyTorchRegistriesRepositorySpy } = makeSut()
    const fakeTorchRegistries = [
      {
        id: 'id-1',
        torchCount: 1,
        torchCharge: 3,
        isLit: true,
      },
      {
        id: 'id-2',
        torchCount: 2,
        torchCharge: 1,
        isLit: false
      }
    ]
    findAllTorchRegistriesRepositorySpy.findAll.mockResolvedValueOnce(fakeTorchRegistries)

    await sut.consumeAll()

    expect(updateManyTorchRegistriesRepositorySpy.updateMany).toHaveBeenCalledWith([
      {
        id: fakeTorchRegistries[0].id,
        torchCount: fakeTorchRegistries[0].torchCount,
        torchCharge: 2,
        isLit: fakeTorchRegistries[0].isLit
      },
      fakeTorchRegistries[1]
    ])
  })

  it('should return if FindAllTorchRegistriesRepository returns an empty list', async () => {
    const { sut, findAllTorchRegistriesRepositorySpy, updateManyTorchRegistriesRepositorySpy } = makeSut()
    findAllTorchRegistriesRepositorySpy.findAll.mockResolvedValueOnce([])

    await sut.consumeAll()

    expect(updateManyTorchRegistriesRepositorySpy.updateMany).not.toHaveBeenCalled()
  })
})
