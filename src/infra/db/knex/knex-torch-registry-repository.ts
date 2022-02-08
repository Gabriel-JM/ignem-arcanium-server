import {
  CreateTorchRegistryRepository,
  CreateTorchRegistryRepositoryParams,
  FindAllTorchRegistriesRepository,
  FindTorchRegistryByIdRepository,
  FindTorchRegistryByIdRepositoryResult,
  UpdateManyTorchRegistriesRepository,
  UpdateManyTorchRegistriesRepositoryParams,
  UpdateTorchRegistryRepository,
  UpdateTorchRegistryRepositoryParams
} from '@/data/protocols/repository'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

interface DbTorchRegistry {
  id: string
  character_name: string
  torch_count: number
  torch_charge: number
  is_lit: boolean
}

type TorchRegistryRepository = CreateTorchRegistryRepository
  & FindAllTorchRegistriesRepository
  & FindTorchRegistryByIdRepository
  & UpdateManyTorchRegistriesRepository
  & UpdateTorchRegistryRepository

export class KnexTorchRegistryRepository implements TorchRegistryRepository {
  tableName = 'torch_registries'

  constructor(private readonly knexHelper: KnexHelper) {}

  #mapFields = (dbData: DbTorchRegistry) => ({
    id: dbData.id,
    characterName: dbData.character_name,
    torchCount: dbData.torch_count,
    torchCharge: dbData.torch_charge,
    isLit: Boolean(dbData.is_lit)
  })
  
  async create(params: CreateTorchRegistryRepositoryParams) {
    await this.knexHelper.table(this.tableName).insert({
      id: params.id,
      character_name: params.characterName,
      torch_count: params.torchCount,
      torch_charge: params.torchCharge,
      is_lit: params.isLit
    })
  }

  async findById(id: string) {
    const dbResult = await this.knexHelper
      .table(this.tableName)
      .where({ id })
      .first<DbTorchRegistry>()

    return dbResult ? this.#mapFields(dbResult) : null
  }

  async findAll() {
    const dbResultList = await this.knexHelper
      .table(this.tableName)
      .select('id', 'character_name', 'torch_count', 'torch_charge', 'is_lit')

    return dbResultList.map(this.#mapFields)
  }

  async update(params: UpdateTorchRegistryRepositoryParams) {
    await this.knexHelper
      .table(this.tableName)
      .where({ id: params.id })
      .update({
        ...params.torchCount && { torch_count: params.torchCount },
        ...params.torchCharge && { torch_charge: params.torchCharge },
        ...params.isLit && { is_lit: params.isLit }
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
