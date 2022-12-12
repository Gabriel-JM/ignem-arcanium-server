import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'
import {
  CheckCharacterRepository,
  CheckCharacterRepositoryParams,
  DeleteCharacterRepository,
  DeleteCharacterRepositoryParams,
  FindAllCharactersRepository,
  UpdateCharacterRepository,
  UpdateCharacterRepositoryParams
} from '@/data/protocols/repository/index.js'
import { KnexEquipmentsRepository } from '@/infra/db/knex/equipments/knex-equipments-repository.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import {
  creaturesFields,
  DbCharacter,
  DbCreature,
  DbInventory,
  DbItem,
  itemsFields
} from '@/infra/db/models/index.js'

type Repository = FindAllCharactersRepository
  & CheckCharacterRepository
  & DeleteCharacterRepository
  & UpdateCharacterRepository

type DbCharacterWithData = DbCharacter & DbCreature & DbInventory & {
  inventory_id: string
  items: Array<DbItem & { quantity: number, inventory_id: string }>
}

export class KnexCharacterRepository implements Repository {
  tableName = 'characters'
  #knexHelper: KnexHelper
  #idGenerator: UniqueIdGenerator

  constructor(knexHelper: KnexHelper, idGenerator: UniqueIdGenerator) {
    this.#knexHelper = knexHelper
    this.#idGenerator = idGenerator
  }

  #mapFields(dbData: DbCharacterWithData) {
    const {
      account_id: accountId,
      creature_id: creatureId,
      character_points: characterPoints,
      status_effects: statusEffects,
      inventory_id: inventoryId,
      size,
      space_in_use: spaceInUse,
      items,
      ...rest
    } = dbData

    return {
      ...rest,
      creatureId,
      accountId,
      characterPoints,
      statusEffects,
      inventory: {
        id: inventoryId,
        size,
        spaceInUse,
        items
      }
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
      .select<DbCharacterWithData[]>(
        'characters.*',
        ...creaturesFields,
        'inventories.id as inventory_id',
        'inventories.size',
        'inventories.space_in_use'
      )
      .join('creatures', 'creatures.id', 'characters.creature_id')
      .join('inventories', 'inventories.creature_id', 'creatures.id')
      .where({ account_id: accountId })

    const equipments = await new KnexEquipmentsRepository(this.#knexHelper, this.#idGenerator)
      .findByCreatureIds(characters.map(char => char.creature_id))

    const items = await this.#knexHelper
      .table('inventory_item')
      .select(
        'inventory_item.inventory_id',
        'inventory_item.quantity',
        ...itemsFields
      )
      .whereIn('inventory_id', characters.map(char => char.inventory_id))
      .join('items', 'items.id', 'inventory_item.item_id')

    const a = characters
      .map(character => ({
        ...character,
        items: items.map(item => {
          if (item.inventory_id === character.inventory_id) {
            return item
          }
        }).filter(Boolean),
        equipments: equipments.reduce((acc, equip) => {
          console.log(equip)
          if (equip.creatureId !== character.creature_id) {
            return acc
          }

          return {
            ...acc,
            [equip.slotName]: equip
          }
        }, {})
      }))
      .map(this.#mapFields)

    return a
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
