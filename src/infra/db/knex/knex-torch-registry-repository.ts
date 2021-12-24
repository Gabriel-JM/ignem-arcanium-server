import { CreateTorchRegistryRepository, CreateTorchRegistryRepositoryParams } from '@/data/protocols/repository'
import { knexHelper } from '@/infra/db/knex/knex-helper'

type TorchRegistryRepository = CreateTorchRegistryRepository

export class KnexTorchRegistryRepository implements TorchRegistryRepository {
  tableName = 'torch_registries'
  
  async create(params: CreateTorchRegistryRepositoryParams) {
    await knexHelper.table(this.tableName).insert({
      id: params.id,
      character_name: params.characterName,
      torch_count: params.torchCount,
      torch_charge: params.torchCharge,
      is_lit: params.isLit
    })
  }
}
