import { DbUpdateCharacter } from '@/data/usecases/index.js'
import { fakeCharacter, mockUpdateCharacterRepository } from '@/tests/unit/mocks/index.js'

function makeSut() {
  const updateCharacterRepositorySpy = mockUpdateCharacterRepository()
  const sut = new DbUpdateCharacter(updateCharacterRepositorySpy)

  return {
    sut,
    updateCharacterRepositorySpy
  }
}

describe('DbUpdateCharacter', () => {
  const updateParams = fakeCharacter()

  it('should call UpdateCharacterRepository with correct values', async () => {
    const { sut, updateCharacterRepositorySpy } = makeSut()

    await sut.update(updateParams)

    expect(updateCharacterRepositorySpy.update).toHaveBeenCalledWith(updateParams)
  })
})
