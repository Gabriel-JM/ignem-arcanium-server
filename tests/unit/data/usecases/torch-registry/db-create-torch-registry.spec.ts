import { NoTorchToBeLitError } from '@/data/errors/index.js'
import { DbCreateTorchRegistry } from '@/data/usecases/index.js'
import { mockCreateTorchRegistryRepository, mockUniqueIdGenerator } from '@/tests/unit/mocks/index.js'

function makeSut() {
  const uniqueIdGeneratorSpy = mockUniqueIdGenerator()
  const createTorchRegistryRepositorySpy = mockCreateTorchRegistryRepository()
  const sut = new DbCreateTorchRegistry(uniqueIdGeneratorSpy, createTorchRegistryRepositorySpy)

  return {
    sut,
    uniqueIdGeneratorSpy,
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

  it('should throw a NoTorchToBeLitError if torchCount is 0 and isLit is true', async () => {
    const { sut } = makeSut()
    const params = {
      ...dummyCreateTorchRegistryParams,
      torchCount: 0,
      torchCharge: 0,
      isLit: true
    }

    const promise = sut.create(params)

    await expect(promise).rejects.toThrowError(new NoTorchToBeLitError(params))
  })

  it('should call UniqueIdGenerator with correct', async () => {
    const { sut, uniqueIdGeneratorSpy } = makeSut()

    await sut.create(dummyCreateTorchRegistryParams)

    expect(uniqueIdGeneratorSpy.generate).toHaveBeenCalledWith()
  })
  
  it('should call CreateTorchRegistryRepository with correct values', async () => {
    const { sut, createTorchRegistryRepositorySpy } = makeSut()

    await sut.create(dummyCreateTorchRegistryParams)

    expect(createTorchRegistryRepositorySpy.create).toHaveBeenCalledWith({
      id: 'any_id',
      ...dummyCreateTorchRegistryParams
    })
  })

  it('should return the torch registry on success', async () => {
    const { sut } = makeSut()

    const response = await sut.create(dummyCreateTorchRegistryParams)

    expect(response).toBe('any_id')
  })
})
