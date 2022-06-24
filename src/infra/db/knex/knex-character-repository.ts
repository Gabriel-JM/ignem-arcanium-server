import {
  CheckCharacterRepository,
  CheckCharacterRepositoryParams,
  CreateCharacterRepository,
  CreateCharacterRepositoryParams,
  FindAllCharactersRepository
} from '@/data/protocols/repository'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

interface DbCharacter extends Omit<CreateCharacterRepositoryParams, 'accountId'> {
  account_id: string
}

type Repository = CreateCharacterRepository
  & FindAllCharactersRepository
  & CheckCharacterRepository

export class KnexCharacterRepository implements Repository {
  tableName = 'characters'

  constructor(private readonly knexHelper: KnexHelper) {}

  #mapFields(dbData: DbCharacter) {
    const { account_id: accountId, ...rest } = dbData

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

    return characters.map(this.#mapFields)
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
        charism: params.charism
      })
  }
}
