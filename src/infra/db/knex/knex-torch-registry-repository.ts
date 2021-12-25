import { CreateTorchRegistryRepository, CreateTorchRegistryRepositoryParams, FindAllTorchRegistriesRepository } from '@/data/protocols/repository'
import { knexHelper } from '@/infra/db/knex/knex-helper'

type TorchRegistryRepository = CreateTorchRegistryRepository & FindAllTorchRegistriesRepository

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

  async findAll() {
    const dbResultList = await knexHelper
      .table(this.tableName)
      .select('id', 'torch_count', 'torch_charge', 'is_lit')

    return dbResultList.map(dbResult => {
      return {
        id: dbResult.id,
        torchCount: dbResult.torch_count,
        torchCharge: dbResult.torch_charge,
        isLit: Boolean(dbResult.is_lit)
      }
    })
  }
}
