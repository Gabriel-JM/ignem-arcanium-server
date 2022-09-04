import { DbConsumeAllTorchesCharge } from '@/data/usecases/index.js'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/index.js'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories/index.js'
import { ConsumeAllTorchesChargeController } from '@/presentation/controllers/index.js'

export function makeConsumeAllTorchesController() {
  const torchRegistryRepository = makeKnexTorchRegistryRepository()
  const dbConsumeAllTorches = new DbConsumeAllTorchesCharge(
    torchRegistryRepository,
    torchRegistryRepository
  )

  const controller = new ConsumeAllTorchesChargeController(dbConsumeAllTorches)

  return new ErrorHandlerControllerDecorator(controller)
}
