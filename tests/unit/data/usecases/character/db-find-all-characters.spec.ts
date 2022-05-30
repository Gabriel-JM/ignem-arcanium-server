import { DbFindAllCharacters } from '@/data/usecases'
import { mockFindAllCharactersRepository } from '@/tests/unit/mocks'

function makeSut() {
  const findAllCharactersRepositorySpy = mockFindAllCharactersRepository()
  const sut = new DbFindAllCharacters(findAllCharactersRepositorySpy)

  return {
    sut,
    findAllCharactersRepositorySpy
  }
}

describe('DbFindAllCharacters', () => {
  it('should call FindAllCharactersRepository with correct values', async () => {
    const { sut, findAllCharactersRepositorySpy } = makeSut()

    await sut.findAll({ accountId: 'any_account_id' })

    expect(findAllCharactersRepositorySpy.findAll).toHaveBeenCalledWith(
      'any_account_id'
    )
  })

  it('should return the characters on success', async () => {
    const { sut, findAllCharactersRepositorySpy } = makeSut()

    const response = await sut.findAll({ accountId: 'any_account_id' })

    expect(response).toEqual(findAllCharactersRepositorySpy.result)
  })
})
