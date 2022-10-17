import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'
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
} from '@/data/protocols/repository/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { DbCharacter, DbCreature } from '@/infra/db/models/index.js'

const creaturesFields = ([
  'name',
  'icon',
  'alignment',
  'description',
  'gold',
  'status_effects',
  'hp',
  'mp',
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
]).map(field => `creatures.${field}`)

type Repository = CreateCharacterRepository
  & FindAllCharactersRepository
  & CheckCharacterRepository
  & DeleteCharacterRepository
  & UpdateCharacterRepository

export class KnexCharacterRepository implements Repository {
  tableName = 'characters'
  #knexHelper: KnexHelper
  #uniqueIdGenerator: UniqueIdGenerator

  constructor(knexHelper: KnexHelper, uniqueIdGenerator: UniqueIdGenerator) {
    this.#knexHelper = knexHelper
    this.#uniqueIdGenerator = uniqueIdGenerator
  }

  #mapFields(dbData: DbCharacter & DbCreature) {
    const {
      account_id: accountId,
      creature_id: creatureId,
      character_points: characterPoints,
      status_effects: statusEffects,
      ...rest
    } = dbData

    return {
      ...rest,
      creatureId,
      accountId,
      characterPoints,
      statusEffects
    }
  }

  async check({ id, accountId }: CheckCharacterRepositoryParams) {
    const exists = await this.#knexHelper
      .table(this.tableName)
      .select(this.#knexHelper.conn.raw('1'))
      .where({ id, account_id: accountId })
      .first()

    return Boolean(exists)
  }
  
  async findAll(accountId: string) {
    const characters = await this.#knexHelper
      .table(this.tableName)
      .select<(DbCharacter & DbCreature)[]>(
        'characters.*',
        ...creaturesFields
      )
      .join('creatures', 'creatures.id', 'characters.creature_id')
      .where({ account_id: accountId })

    return characters.map(this.#mapFields)
  }

  async create(params: CreateCharacterRepositoryParams): Promise<void> {
    await this.#knexHelper.transaction(async trx => {
      const creatureId = this.#uniqueIdGenerator.generate()
      await this.#knexHelper
        .table('creatures')
        .insert({
          id: creatureId,
          name: params.name,
          icon: params.icon,
          status_effects: params.statusEffects,
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

      await this.#knexHelper
        .table(this.tableName)
        .insert({
          id: params.id,
          account_id: params.accountId,
          creature_id: creatureId,
          level: params.level,
          experience: 0,
          character_points: params.characterPoints,
        })
        .transacting(trx)

      const inventoryId = this.#uniqueIdGenerator.generate()

      await this.#knexHelper
        .table('inventories')
        .insert({
          id: inventoryId,
          size: 200
        })
        .transacting(trx)

      if (params.inventoryItems.length) {
        await this.#knexHelper
          .table('inventory_item')
          .insert(params.inventoryItems.map(item => {
            return {
              id: this.#uniqueIdGenerator.generate(),
              inventoryId,
              itemId: item.itemId,
              quantity: item.quantity
            }
          }))
          .transacting(trx)
      }
    })
  }

  async delete(params: DeleteCharacterRepositoryParams) {
    await this.#knexHelper.transaction(async trx => {
      const { creature_id } = await this.#knexHelper
        .table(this.tableName)
        .select('creature_id')
        .where({ id: params.id })
        .first<DbCharacter>()

      await this.#knexHelper
        .table(this.tableName)
        .where({ id: params.id, account_id: params.accountId })
        .delete()
        .transacting(trx)

      await this.#knexHelper
        .table('creatures')
        .where({ id: creature_id })
        .delete()
        .transacting(trx)
    })
  }

  async update({ id, accountId, ...data }: UpdateCharacterRepositoryParams) {
    await this.#knexHelper.transaction(async trx => {
      const { creature_id } = await this.#knexHelper
        .table(this.tableName)
        .select('creature_id')
        .where({ id })
        .first<DbCharacter>()

      await this.#knexHelper
        .table('creatures')
        .where({ id: creature_id })
        .update({
          name: data.name,
          icon: data.icon,
          alignment: data.alignment,
          description: data.description,
          gold: data.gold,
          status_effects: data.statusEffects,
          hp: data.hp,
          mp: data.mp,
          strength: data.strength,
          dexterity: data.dexterity,
          constitution: data.constitution,
          intelligence: data.intelligence,
          wisdom: data.wisdom,
          charisma: data.charisma
        })

      await this.#knexHelper
        .table(this.tableName)
        .where({ id, account_id: accountId })
        .update({
          level: data.level,
          experience: data.experience,
          character_points: data.characterPoints
        })
        .transacting(trx)
    })
  }
}
