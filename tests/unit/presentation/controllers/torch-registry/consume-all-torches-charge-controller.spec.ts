import { ConsumeAllTorchesChargeController } from '@/presentation/controllers/index.js'
import { noContent } from '@/presentation/helpers/index.js'
import { mockConsumeAllTorchesCharge } from '@/tests/unit/mocks/index.js'

function makeSut() {
  const consumeAllTorchesChargeSpy = mockConsumeAllTorchesCharge()
  const sut = new ConsumeAllTorchesChargeController(consumeAllTorchesChargeSpy)

  return {
    sut,
    consumeAllTorchesChargeSpy
  }
}

describe('ConsumeAllTorchesChargeController', () => {
  it('should call ConsumeAllTorchesCharge', async () => {
    const { sut, consumeAllTorchesChargeSpy } = makeSut()

    await sut.handle()

    expect(consumeAllTorchesChargeSpy.consumeAll).toHaveBeenCalledWith()
  })
  
  it('should return a no content response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual(noContent())
  })
})
