import { UniqueIdGenerator } from '@/data/protocols/identification/unique-id-generator.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import {
  alchemicalItemsFields,
  gemsFields,
  itemsFields,
  shieldsAndArmorsFields,
  weaponsFields
} from '@/infra/db/models/index.js'
import { DbEquipment } from '@/infra/db/models/equipment.js'
import { sneakObjectToCamel } from '@/infra/utils/snake-case-to-camel-case.js'

interface Equipment {
  id: string
  creatureId: string
  slotName: string
  itemId: string
}

export interface CreateEquipmentRepositoryParams {
  creatureId: string
  equipment: {
    rightHand?: string
    leftHand?: string
    armor?: string
    accessory1?: string
    accessory2?: string
  }
}

const itemTypesToTables = <Record<string, string>> {
  weapon: 'weapons',
  shield: 'shields_armors',
  armor: 'shields_armors',
  alchemicalItem: 'alchemical_items',
  gem: 'gems'
}

const itemFieldsByType = <Record<string, string[]>> {
  weapon: ['weapons.id', 'weapons.id as weapon_id', ...weaponsFields],
  shield: ['shields_armors.id', 'shields_armors.id as shield_id', ...shieldsAndArmorsFields],
  armor: ['shields_armors.id', 'shields_armors.id as armor_id', ...shieldsAndArmorsFields],
  alchemicalItem: ['alchemical_items.id', 'alchemical_items.id as alchemical_item_id', ...alchemicalItemsFields],
  gem: ['gems.id', 'gems.id as gem_id', ...gemsFields]
}

export class KnexEquipmentsRepository {
  tableName = 'characters'
  #knexHelper: KnexHelper
  #idGenerator: UniqueIdGenerator

  constructor(knexHelper: KnexHelper, idGenerator: UniqueIdGenerator) {
    this.#knexHelper = knexHelper
    this.#idGenerator = idGenerator
  }

  async findByCreatureIds(creatureIds: string[]): Promise<Equipment[]> {
    const foundEquipments = await this.#knexHelper
      .table('equipments')
      .select(
        'equipments.*',
        ...itemsFields
      )
      .whereIn('equipments.creature_id', creatureIds)
      .join('items', 'items.id', 'equipments.item_id')

    const detailedEquipments = await Promise.all(foundEquipments
      .map(async equipment => {
        const table = itemTypesToTables[equipment.type]

        if (!table) return equipment

        const itemDetails = await this.#knexHelper
          .table(table)
          .select(...itemFieldsByType[equipment.type])
          .where({ item_id: equipment.item_id })
          .first()

        return { ...equipment, ...itemDetails }
      })
    )
    
    return detailedEquipments.map(sneakObjectToCamel) as Equipment[]
  }

  async create({ creatureId, equipment }: CreateEquipmentRepositoryParams) {
    await this.#knexHelper
      .table('equipments')
      .insert(<DbEquipment[]> [
        {
          id: this.#idGenerator.generate('equipments'),
          creature_id: creatureId,
          slot_name: 'rightHand',
          item_id: equipment.rightHand ?? null,
        },
        {
          id: this.#idGenerator.generate('equipments'),
          creature_id: creatureId,
          slot_name: 'leftHand',
          item_id: equipment.leftHand ?? null,
        },
        {
          id: this.#idGenerator.generate('equipments'),
          creature_id: creatureId,
          slot_name: 'armor',
          item_id: equipment.armor ?? null,
        },
        {
          id: this.#idGenerator.generate('equipments'),
          creature_id: creatureId,
          slot_name: 'firstAccessory',
          item_id: equipment.accessory1 ?? null,
        },
        {
          id: this.#idGenerator.generate('equipments'),
          creature_id: creatureId,
          slot_name: 'secondAccessory',
          item_id: equipment.accessory2 ?? null,
        }
      ])
  }
}
