import {
  FindManyItemsRepository,
  FindManyItemsRepositoryResult,
  FindSlotItemByIdRepository,
  InventoryItemsRepository,
  ListAllCommonItemsRepository
} from '@/data/protocols/repository/index.js'
import { ListAllCommonItemsResult } from '@/domain/usecases/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { alchemicalItemsFields } from '@/infra/db/models/alchemical-item.js'
import { itemsFields } from '@/infra/db/models/item.js'
import { shieldsAndArmorsFields } from '@/infra/db/models/shield-and-armor.js'
import { weaponsFields } from '@/infra/db/models/weapon.js'

type ItemRepository = ListAllCommonItemsRepository
  & InventoryItemsRepository
  & FindSlotItemByIdRepository
  & FindManyItemsRepository

export class KnexItemRepository implements ItemRepository {
  #knexHelper: KnexHelper

  constructor(knexHelper: KnexHelper) {
    this.#knexHelper = knexHelper
  }
  
  async listAllCommon(): Promise<ListAllCommonItemsResult> {
    const consumablesAndTools = await this.#knexHelper
      .table('items')
      .whereIn('type', ['CONSUMABLE', 'TOOL'])

    const weapons = await this.#findAllCommonWeapons()
    const shieldsAndArmors = await this.#findAllCommonShieldsAndArmors()
    const alchemicalItems = await this.#findAllAlchemicalItems()
    const gems = await this.#findAllGems()

    return [
      ...consumablesAndTools,
      ...weapons,
      ...shieldsAndArmors,
      ...alchemicalItems,
      ...gems
    ]
  }

  async findSlotItemById<T extends Record<string, string>>(itemSlots: T) {
    const itemIds = Object.values(itemSlots)

    if (!itemIds.length) return {}

    const items = await this.#knexHelper
      .table('items')
      .whereIn('id', itemIds)

    const entries = Object.entries(itemSlots)

    return items.reduce((acc, item) => {
      const itemEntry = entries.find(
        ([_, id]) => id === item.id
      )

      if (!itemEntry) {
        return acc
      }

      return { ...acc, [itemEntry[0]]: item }
    }, {})
  }

  async findMany(ids: string[]): Promise<FindManyItemsRepositoryResult> {
    return await this.#knexHelper.table('items').whereIn('id', ids)
  }

  async findManyByInventoryId(inventoryId: string) {
    return await this.#knexHelper
      .table('items')
      .select('inventory_item.quantity', 'items.*')
      .join('inventory_item', 'inventory_item.inventory_id', inventoryId)
  }

  async #findAllCommonWeapons() {
    const dbWeapons = await this.#knexHelper
      .table('items')
      .select(
        ...itemsFields,
        ...weaponsFields
      )
      .join('weapons', 'weapons.item_id', 'items.id')

    return dbWeapons.map(weapon => {
      const { initiative_modifier: initiativeModifier, ...rest } = weapon

      return {
        ...rest,
        initiativeModifier
      }
    })
  }

  async #findAllCommonShieldsAndArmors() {
    const dbShieldsAndArmors = await this.#knexHelper
      .table('items')
      .select(
        ...itemsFields,
        ...shieldsAndArmorsFields
      )
      .join('shields_armors', 'shields_armors.item_id', 'items.id')
    
    return dbShieldsAndArmors.map(shieldOrArmor => {
      const {
        damage_reduction: damageReduction,
        initiative_modifier: initiativeModifier,
        ...rest
      } = shieldOrArmor

      return {
        ...rest,
        damageReduction,
        initiativeModifier
      }
    })
  }

  async #findAllAlchemicalItems() {
    const dbAlchemicalItems = await this.#knexHelper
      .table('items')
      .select(
        'items.id',
        ...itemsFields,
        ...alchemicalItemsFields
      )
      .join('alchemical_items', 'alchemical_items.item_id', 'items.id')

    return dbAlchemicalItems.map(alchemicalItem => {
      const { brew_price: brewPrice, brew_time: brewTime, ...rest } = alchemicalItem
      
      return {
        ...rest,
        brewPrice,
        brewTime
      }
    })
  }

  async #findAllGems() {
    const dbGems = await this.#knexHelper
      .table('items')
      .select('gems.magic_tier', 'items.id', ...itemsFields)
      .join('gems', 'gems.item_id', 'items.id')

    return dbGems.map(gem => {
      const { magic_tier: magicTier, ...rest } = gem

      return { ...rest, magicTier }
    })
  }
}