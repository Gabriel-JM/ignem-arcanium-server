import { UpdateTorchRegistryController } from '@/presentation/controllers'
import { noContent } from '@/presentation/helpers'
import { mockUpdateTorchRegistry } from '@/tests/unit/mocks'

function makeSut() {
  const updateTorchRegistrySpy = mockUpdateTorchRegistry()
  const sut = new UpdateTorchRegistryController(updateTorchRegistrySpy)

  return {
    sut,
    updateTorchRegistrySpy
  }
}

describe('UpdateTorchRegistryController', () => {
  it('should call UpdateTorchRegistry with correct values', async () => {
    const { sut, updateTorchRegistrySpy } = makeSut()

    await sut.handle({
      id: 'any_id',
      torchCount: 2,
      isLit: false
    })

    expect(updateTorchRegistrySpy.update).toHaveBeenCalledWith({
      id: 'any_id',
      torchCount: 2,
      isLit: false
    })
  })

  it('should return 200 response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({
      id: 'any_id'
    })

    expect(response).toEqual(noContent())
  })
})
