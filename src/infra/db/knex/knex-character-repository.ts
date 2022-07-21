import {
  CheckCharacterRepository,
  CheckCharacterRepositoryParams,
  CreateCharacterRepository,
  CreateCharacterRepositoryParams,
  DeleteCharacterRepository,
  DeleteCharacterRepositoryParams,
  FindAllCharactersRepository,
  UpdateCharacterRepository,
  UpdateCharacterRepositoryParams
} from '@/data/protocols/repository'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { DbCharacter } from '@/infra/db/models'

type Repository = CreateCharacterRepository
  & FindAllCharactersRepository
  & CheckCharacterRepository
  & DeleteCharacterRepository
  & UpdateCharacterRepository

export class KnexCharacterRepository implements Repository {
  tableName = 'characters'

  constructor(private readonly knexHelper: KnexHelper) {}

  #mapFields(dbData: DbCharacter) {
    const {
      account_id: accountId,
      character_points: characterPoints,
      ...rest
    } = dbData

    return {
      ...rest,
      accountId,
      characterPoints
    }
  }

  async check({ id, accountId }: CheckCharacterRepositoryParams) {
    const exists = await this.knexHelper
      .table(this.tableName)
      .select(this.knexHelper.conn.raw('1'))
      .where({ id, account_id: accountId })
      .first()

    return Boolean(exists)
  }
  
  async findAll(accountId: string) {
    const characters = await this.knexHelper
      .table(this.tableName)
      .select<DbCharacter[]>()
      .where({ account_id: accountId })

    return characters.map(this.#mapFields)
  }

  async create(params: CreateCharacterRepositoryParams): Promise<void> {
    await this.knexHelper.transaction(async trx => {
      await this.knexHelper
        .table(this.tableName)
        .insert({
          id: params.id,
          account_id: params.accountId,
          name: params.name,
          icon: params.icon,
          level: params.level,
          experience: 0,
          character_points: params.characterPoints,
          alignment: params.alignment,
          gold: params.gold,
          hp: params.hp,
          mp: params.mp,
          strength: params.strength,
          dexterity: params.dexterity,
          constitution: params.constitution,
          intelligence: params.intelligence,
          wisdom: params.wisdom,
          charisma: params.charisma,
          ...params.description && { description: params.description }
        })
        .transacting(trx)

      await this.knexHelper
        .table('inventories')
        .insert({
          id: params.inventoryId,
          size: 200
        })
        .transacting(trx)
    })
  }

  async delete(params: DeleteCharacterRepositoryParams) {
    await this.knexHelper
      .table(this.tableName)
      .where({ id: params.id, account_id: params.accountId })
      .delete()
  }

  async update({ id, accountId, ...data }: UpdateCharacterRepositoryParams) {
    await this.knexHelper
      .table(this.tableName)
      .where({ id, account_id: accountId })
      .update(data)
  }
}
