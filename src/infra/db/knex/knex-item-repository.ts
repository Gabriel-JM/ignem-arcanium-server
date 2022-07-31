import { ListAllCommonItemsRepository } from '@/data/protocols/repository'
import { ListAllCommonItemsResult } from '@/domain/usecases'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

const itemsFields = ([
  'name',
  'type',
  'rarity',
  'description',
  'price',
  'weight'
]).map(field => `items.${field}`)

const weaponsFields = ([
  'damage',
  'properties',
  'initiative_modifier',
  'distance'
]).map(field => `weapons.${field}`)

const shieldsAndArmorsFields = ([
  'damage_reduction',
  'properties',
  'initiative_modifier'
]).map(field => `shields_armors.${field}`)

const alchemicalItemsFields = ([
  'brew_price',
  'brew_time',
  'effects'
]).map(field => `alchemical_items.${field}`)

export class KnexItemRepository implements ListAllCommonItemsRepository {
  constructor(private readonly knexHelper: KnexHelper) {}
  
  async listAllCommon(): Promise<ListAllCommonItemsResult> {
    const consumablesAndTools = await this.knexHelper
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

  async #findAllCommonWeapons() {
    const dbWeapons = await this.knexHelper
      .table('items')
      .select(
        'id as weapons.id',
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
    const dbShieldsAndArmors = await this.knexHelper
      .table('items')
      .select(
        'id as shields_armors.id',
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
    const dbAlchemicalItems = await this.knexHelper
      .table('items')
      .select(
        'id as alchemical_items.id',
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
    const dbGems = await this.knexHelper
      .table('items')
      .select('id as gems.id', 'gems.magic_tier', ...itemsFields)
      .join('gems', 'gems.item_id', 'items.id')

    return dbGems.map(gem => {
      const { magic_tier: magicTier, ...rest } = gem

      return { ...rest, magicTier }
    })
  }
}