import { DbCreateCharacter } from '@/data/usecases'
import { fakeCreateCharacterParams, mockCreateCharacterRepository, mockUniqueIdGenerator } from '@/tests/unit/mocks'

function makeSut() {
  const uniqueIdGeneratorSpy = mockUniqueIdGenerator()
  const createCharacterRepositorySpy = mockCreateCharacterRepository()
  const sut = new DbCreateCharacter(uniqueIdGeneratorSpy, createCharacterRepositorySpy)

  return {
    sut,
    uniqueIdGeneratorSpy,
    createCharacterRepositorySpy
  }
}

describe('DbCreateCharacter', () => {
  const dummyCreateCharacterParams = fakeCreateCharacterParams()

  it('should call UniqueIdGenerator with correct values', async () => {
    const { sut, uniqueIdGeneratorSpy } = makeSut()

    await sut.create(dummyCreateCharacterParams)

    expect(uniqueIdGeneratorSpy.generate).toHaveBeenCalledWith()
  })

  it('should call CreateCharacterRepository with correct values', async () => {
    const { sut, createCharacterRepositorySpy, uniqueIdGeneratorSpy } = makeSut()

    await sut.create(dummyCreateCharacterParams)

    expect(createCharacterRepositorySpy.create).toHaveBeenCalledWith({
      id: uniqueIdGeneratorSpy.result,
      inventoryId: uniqueIdGeneratorSpy.result,
      hp: 12,
      mp: 12,
      ...dummyCreateCharacterParams
    })
  })

  it('should return the id on success', async () => {
    const { sut, uniqueIdGeneratorSpy } = makeSut()

    const response = await sut.create(dummyCreateCharacterParams)

    expect(response).toEqual({ id: uniqueIdGeneratorSpy.result })
  })
})
