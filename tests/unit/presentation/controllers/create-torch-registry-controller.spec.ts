import { CreateTorchRegistryController } from '@/presentation/controllers/create-torch-registry-controller'
import { ok } from '@/presentation/helpers'
import { mockCreateTorchRegistry } from '@/tests/unit/presentation/helpers'

function makeSut() {
  const createTorchRegistrySpy = mockCreateTorchRegistry()
  const sut = new CreateTorchRegistryController(createTorchRegistrySpy)

  return {
    sut,
    createTorchRegistrySpy
  }
}

describe('CreateTorchRegistryController', () => {
  const dummyHandleParams = {
    characterName: 'any_char_name',
    torchCount: 1,
    torchCharge: 1,
    isLit: false
  }
  
  it('should call CreateTorchRegistry with correct values', async () => {
    const { sut, createTorchRegistrySpy } = makeSut()

    await sut.handle(dummyHandleParams)

    expect(createTorchRegistrySpy.create).toHaveBeenCalledWith(dummyHandleParams)
  })

  it('should return 200 response on success', async () => {
    const { sut, createTorchRegistrySpy } = makeSut()

    const response = await sut.handle(dummyHandleParams)

    expect(response).toEqual(ok({ id: createTorchRegistrySpy.result }))
  })
})
