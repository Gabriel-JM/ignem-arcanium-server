import { CreateTorchRegistryRepository, CreateTorchRegistryRepositoryParams } from '@/data/protocols/repository'
import { knexHelper } from '@/infra/db/knex/knex-helper'

export class KnexTorchRegistryRepository implements CreateTorchRegistryRepository {
  tableName = 'torch_registries'
  
  async create(params: CreateTorchRegistryRepositoryParams) {
    await knexHelper.table(this.tableName).insert(params)
  }
}
