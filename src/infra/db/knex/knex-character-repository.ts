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
import { DbCharacter } from '@/infra/db/protocols/models'

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
      accountId
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

    return characters.map(character => {
      return {
        id: character.id,
        accountId: character.account_id,
        name: character.name,
        icon: character.icon,
        level: character.level,
        gold: character.gold,
        hp: character.hp,
        mp: character.mp,
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charism: character.charisma
      }
    })
  }

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
        charism: params.charisma
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
