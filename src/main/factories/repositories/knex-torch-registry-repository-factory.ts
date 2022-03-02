import { KnexTorchRegistryRepository } from '@/infra/db'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { knexConnection } from '@/main/factories/repositories'

export function makeKnexTorchRegistryRepository() {
  const knexHelper = new KnexHelper(knexConnection)
  const torchRegistryRepository = new KnexTorchRegistryRepository(knexHelper)

  return torchRegistryRepository
}