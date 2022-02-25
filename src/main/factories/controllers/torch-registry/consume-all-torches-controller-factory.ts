import { DbConsumeAllTorchesCharge } from '@/data/usecases'
import { KnexTorchRegistryRepository } from '@/infra/db'
import { connect, KnexHelper } from '@/infra/db/knex/knex-helper'
import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { ConsumeAllTorchesChargeController } from '@/presentation/controllers'

export function makeConsumeAllTorchesController() {
  const dbFileName = process.env.NODE_ENV === 'development'
    ? 'ignem-arcanium.db'
    : 'ignem-arcanium.test.db'
  const knexHelper = new KnexHelper(connect(dbFileName))
  const torchRegistryRepository = new KnexTorchRegistryRepository(knexHelper)
  const dbConsumeAllTorches = new DbConsumeAllTorchesCharge(
    torchRegistryRepository,
    torchRegistryRepository
  )

  const controller = new ConsumeAllTorchesChargeController(dbConsumeAllTorches)

  return new ErrorHandlerControllerDecorator(controller)
}
