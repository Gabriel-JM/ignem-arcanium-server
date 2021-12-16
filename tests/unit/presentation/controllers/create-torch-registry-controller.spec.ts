import { CreateTorchRegistryController } from '@/presentation/controllers/create-torch-registry-controller'
import { mockCreateTorchRegistry } from '@/tests/unit/presentation/helpers'

function makeSut() {
  const createTorchRegistry = mockCreateTorchRegistry()
  const sut = new CreateTorchRegistryController(createTorchRegistry)

  return {
    sut,
    createTorchRegistry
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
    const { sut, createTorchRegistry } = makeSut()

    await sut.handle(dummyHandleParams)

    expect(createTorchRegistry.create).toHaveBeenCalledWith(dummyHandleParams)
  })  
})
