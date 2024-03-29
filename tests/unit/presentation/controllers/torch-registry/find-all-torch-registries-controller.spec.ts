import { FindAllTorchRegistriesController } from '@/presentation/controllers/index.js'
import { ok } from '@/presentation/helpers/index.js'
import { mockFindAllTorchRegistries } from '@/tests/unit/mocks/index.js'

function makeSut() {
  const findAllTorchRegistriesSpy = mockFindAllTorchRegistries()
  const sut = new FindAllTorchRegistriesController(findAllTorchRegistriesSpy)

  return {
    sut,
    findAllTorchRegistriesSpy
  }
}

describe('FindAllTorchRegistriesController', () => {
  
  it('should call FindAllTorchRegistries with correct values', async () => {
    const { sut, findAllTorchRegistriesSpy } = makeSut()

    await sut.handle()

    expect(findAllTorchRegistriesSpy.findAll).toHaveBeenCalledWith()
  })

  it('should return 200 response on success', async () => {
    const { sut, findAllTorchRegistriesSpy } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual(ok(findAllTorchRegistriesSpy.result))
  })
})
