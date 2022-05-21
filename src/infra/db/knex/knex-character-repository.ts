import { CreateCharacterRepository, CreateCharacterRepositoryParams } from '@/data/protocols/repository'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

export class KnexCharacterRepository implements CreateCharacterRepository {
  tableName = 'characters'

  constructor(private readonly knexHelper: KnexHelper) {}
  
  async create(params: CreateCharacterRepositoryParams): Promise<void> {
    await this.knexHelper
      .table(this.tableName)
      .insert({
        id: params.id,
        account_id: params.accountId,
        name: params.name,
        icon: params.icon,
        level: params.level,
        gold: params.gold,
        hp: params.hp,
        mp: params.mp,
        strength: params.strength,
        dexterity: params.dexterity,
        constitution: params.constitution,
        intelligence: params.intelligence,
        wisdom: params.wisdom,
        charism: params.charism
      })
  }
}
