import { DbFindAllTorchRegistries } from '@/data/usecases/index.js'
import { mockfindAllTorchRegistriesRepository } from '@/tests/unit/mocks/index.js'

function makeSut() {
  const findAllTorchRegistriesRepositorySpy = mockfindAllTorchRegistriesRepository()
  const sut = new DbFindAllTorchRegistries(findAllTorchRegistriesRepositorySpy)

  return {
    sut,
    findAllTorchRegistriesRepositorySpy
  }
}

describe('DbFindAllTorchRegistries', () => {
  it('should call FindAllTorchRegistriesRepository', async () => {
    const { sut, findAllTorchRegistriesRepositorySpy } = makeSut()

    await sut.findAll()

    expect(findAllTorchRegistriesRepositorySpy.findAll).toHaveBeenCalledWith()
  })

  it('should return a list of torch registries on success', async () => {
    const { sut, findAllTorchRegistriesRepositorySpy } = makeSut()

    const response = await sut.findAll()

    expect(response).toEqual(findAllTorchRegistriesRepositorySpy.result)
  })
})
