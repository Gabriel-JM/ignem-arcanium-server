import { UniqueIdGenerator } from '@/data/protocols/identification/unique-id-generator.js'
import { CreateCharacterRepository, CreateCharacterRepositoryParams } from '@/data/protocols/repository/index.js'
import { KnexEquipmentsRepository } from '@/infra/db/knex/equipments/knex-equipments-repository.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { DbCharacter, DbCreature, DbInventory } from '@/infra/db/models/index.js'

export class KnexCreateCharacterRepository implements CreateCharacterRepository {
  tableName = 'characters'
  #knexHelper: KnexHelper
  #idGenerator: UniqueIdGenerator

  constructor(knexHelper: KnexHelper, idGenerator: UniqueIdGenerator) {
    this.#knexHelper = knexHelper
    this.#idGenerator = idGenerator
  }
  
  async create(params: CreateCharacterRepositoryParams): Promise<void> {
    await this.#knexHelper.transaction(async trx => {
      const creatureId = this.#idGenerator.generate('creatures')
      await this.#knexHelper
        .table('creatures')
        .insert(<DbCreature> {
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
        .insert(<DbCharacter> {
          id: params.id,
          account_id: params.accountId,
          creature_id: creatureId,
          level: params.level,
          experience: 0,
          character_points: params.characterPoints,
        })
        .transacting(trx)

      const { equipment } = params
    
      new KnexEquipmentsRepository(this.#knexHelper, this.#idGenerator)
        .create({ creatureId, equipment })

      const inventoryId = this.#idGenerator.generate('inventories')

      await this.#knexHelper
        .table('inventories')
        .insert(<DbInventory> {
          id: inventoryId,
          creature_id: creatureId,
          size: 200,
          space_in_use: params.inventorySpaceInUse
        })
        .transacting(trx)

      if (params.inventoryItems.length) {
        await this.#knexHelper
          .table('inventory_item')
          .insert(params.inventoryItems.map(item => {
            return {
              id: this.#idGenerator.generate('inventory_item'),
              inventory_id: inventoryId,
              item_id: item.itemId,
              quantity: item.quantity
            }
          }))
          .transacting(trx)
      }
    })
  }

}
