import { DbConsumeAllTorchesCharge } from '@/data/usecases/db-consume-all-torches-charge'
import { mockfindAllTorchRegistriesRepository } from '@/tests/unit/data/helpers'

function makeSut() {
  const findAllTorchRegistriesRepositorySpy = mockfindAllTorchRegistriesRepository()
  const sut = new DbConsumeAllTorchesCharge(findAllTorchRegistriesRepositorySpy)

  return {
    sut,
    findAllTorchRegistriesRepositorySpy
  }
}

describe('DbConsumeAllTorchesCharge', () => {
  it('should call FindAllTorchRegistriesRepository', async () => {
    const { sut, findAllTorchRegistriesRepositorySpy } = makeSut()
    
    await sut.consumeAll()

    expect(findAllTorchRegistriesRepositorySpy.findAll).toHaveBeenCalledWith()
  })
})
