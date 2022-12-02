import { UniqueIdGenerator } from '@/data/protocols/identification/unique-id-generator.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { DbEquipment } from '@/infra/db/models/equipment.js'

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

export class KnexEquipmentsRepository {
  tableName = 'characters'
  #knexHelper: KnexHelper
  #idGenerator: UniqueIdGenerator

  constructor(knexHelper: KnexHelper, idGenerator: UniqueIdGenerator) {
    this.#knexHelper = knexHelper
    this.#idGenerator = idGenerator
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
