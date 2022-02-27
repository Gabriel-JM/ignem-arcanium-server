import { DbConsumeAllTorchesCharge } from '@/data/usecases'
import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { makeKnexTorchRegistryRepository } from '@/main/factories/repositories'
import { ConsumeAllTorchesChargeController } from '@/presentation/controllers'

export function makeConsumeAllTorchesController() {
  const torchRegistryRepository = makeKnexTorchRegistryRepository()
  const dbConsumeAllTorches = new DbConsumeAllTorchesCharge(
    torchRegistryRepository,
    torchRegistryRepository
  )

  const controller = new ConsumeAllTorchesChargeController(dbConsumeAllTorches)

  return new ErrorHandlerControllerDecorator(controller)
}
