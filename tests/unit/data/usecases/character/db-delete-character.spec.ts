import { NotFoundError } from '@/data/errors/index.ts'
import { DbDeleteCharacter } from '@/data/usecases/index.ts'
import { mockCheckCharacterRepository, mockDeleteCharacterRepository } from '@/tests/unit/mocks/index.ts'

function makeSut() {
  const checkCharacterRepositorySpy = mockCheckCharacterRepository()
  const deleteCharacterRepositorySpy = mockDeleteCharacterRepository()
  const sut = new DbDeleteCharacter(
    checkCharacterRepositorySpy,
    deleteCharacterRepositorySpy
  )

  return {
    sut,
    checkCharacterRepositorySpy,
    deleteCharacterRepositorySpy
  }
}

describe('DbDeleteCharacter', () => {
  const deleteParams = {
    id: 'any_id',
    accountId: 'any_account_id'
  }

  it('should call CheckCharacterRepository with correct values', async () => {
    const { sut, checkCharacterRepositorySpy } = makeSut()

    await sut.delete(deleteParams)

    expect(checkCharacterRepositorySpy.check).toHaveBeenCalledWith(deleteParams)
  })

  it('should throw a NotFoundError if CheckCharacterRepository returns false', async () => {
    const { sut, checkCharacterRepositorySpy } = makeSut()
    checkCharacterRepositorySpy.check.mockResolvedValueOnce(false)

    const promise = sut.delete(deleteParams)

    await expect(promise).rejects.toThrowError(new NotFoundError('Character'))
  })

  it('should call DeleteCharacterRepository with correct values', async () => {
    const { sut, deleteCharacterRepositorySpy } = makeSut()

    await sut.delete(deleteParams)

    expect(deleteCharacterRepositorySpy.delete).toHaveBeenCalledWith(deleteParams)
  })
})
