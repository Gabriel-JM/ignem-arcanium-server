import { DbListAllCommonItems } from '@/data/usecases/index.js'
import { mockListAllCommonItemsRepository } from '@/tests/unit/mocks/index.js'

function makeSut() {
  const listAllCommonItemsRepositorySpy = mockListAllCommonItemsRepository()
  const sut = new DbListAllCommonItems(listAllCommonItemsRepositorySpy)

  return {
    sut,
    listAllCommonItemsRepositorySpy
  }
}

describe('DbListAllCommonItem', () => {
  it('should call ListAllCommonItemsRepository with correct values', async () => {
    const { sut, listAllCommonItemsRepositorySpy } = makeSut()

    await sut.listAll()

    expect(listAllCommonItemsRepositorySpy.listAllCommon).toHaveBeenCalledWith()
  })

  it('should return the items from repository on success', async () => {
    const { sut, listAllCommonItemsRepositorySpy } = makeSut()

    const result = await sut.listAll()

    expect(result).toEqual(listAllCommonItemsRepositorySpy.result)
  })
})
