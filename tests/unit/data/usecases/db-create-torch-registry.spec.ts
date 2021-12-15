import { DbCreateTorchRegistry } from '@/data/usecases'
import { mockCreateTorchRegistryRepository } from '../helpers'

function makeSut() {
  const createTorchRegistryRepositorySpy = mockCreateTorchRegistryRepository()
  const sut = new DbCreateTorchRegistry(createTorchRegistryRepositorySpy)

  return {
    sut,
    createTorchRegistryRepositorySpy
  }
}

describe('DbCreateTorchRegistry', () => {
  const dummyCreateTorchRegistryParams = {
    characterName: 'any_char_name',
    torchCount: 1,
    torchCharge: 3,
    isLit: false
  }
  
  it('should call CreateTorchRegistryRepository with correct values', async () => {
    const { sut, createTorchRegistryRepositorySpy } = makeSut()

    await sut.create(dummyCreateTorchRegistryParams)

    expect(createTorchRegistryRepositorySpy.create).toHaveBeenCalledWith(
      dummyCreateTorchRegistryParams
    )
  })

  it('should return the torch registry on success', async () => {
    const { sut } = makeSut()

    const response = await sut.create(dummyCreateTorchRegistryParams)

    expect(response).toBe('any_id')
  })
})
