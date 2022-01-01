import { CreateTorchRegistryRepository, CreateTorchRegistryRepositoryParams, FindAllTorchRegistriesRepository, UpdateManyTorchRegistriesRepository, UpdateManyTorchRegistriesRepositoryParams } from '@/data/protocols/repository'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

type TorchRegistryRepository = CreateTorchRegistryRepository & FindAllTorchRegistriesRepository

export class KnexTorchRegistryRepository implements TorchRegistryRepository {
  tableName = 'torch_registries'

  constructor(private readonly knexHelper: KnexHelper) {}
  
  async create(params: CreateTorchRegistryRepositoryParams) {
    await this.knexHelper.table(this.tableName).insert({
      id: params.id,
      character_name: params.characterName,
      torch_count: params.torchCount,
      torch_charge: params.torchCharge,
      is_lit: params.isLit
    })
  }

  async findAll() {
    const dbResultList = await this.knexHelper
      .table(this.tableName)
      .select('id', 'character_name', 'torch_count', 'torch_charge', 'is_lit')

    return dbResultList.map(dbResult => {
      return {
        id: dbResult.id,
        characterName: dbResult.character_name,
        torchCount: dbResult.torch_count,
        torchCharge: dbResult.torch_charge,
        isLit: Boolean(dbResult.is_lit)
      }
    })
  }

  async updateMany(params: UpdateManyTorchRegistriesRepositoryParams[]) {
    await this.knexHelper.transaction(async (trx) => {
      await Promise.all(params.map(async record => {
        return await this.knexHelper
          .table(this.tableName)
          .where({ id: record.id })
          .update({
            ...(record.torchCount && { torch_count: record.torchCount }),
            ...(record.torchCharge && { torch_charge: record.torchCharge }),
            ...(record.isLit && { is_lit: record.isLit })
          })
          .transacting(trx)
      }))
    })
  }
}
