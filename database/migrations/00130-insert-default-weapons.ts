import { Knex } from 'knex'
import { ItemRarities, ItemTypes } from '../../src/domain/constants/index.ts'
import { makeWeapons } from '../data/weapons.ts'

const weapons = makeWeapons()

export async function up(knex: Knex) {
  for (const data of weapons) {
    await knex('items').insert({
      id: data.itemId,
      name: data.name,
      type: ItemTypes.weapon,
      sub_type: data.subType,
      description: data.description,
      price: data.price,
      weight: data.weight,
      rarity: ItemRarities.common
    })
  
    await knex('weapons').insert({
      id: data.weaponId,
      item_id: data.itemId,
      damage: data.damage,
      properties: data.properties,
      initiative_modifier: data.initiativeModifier,
      distance: data.distance
    })
  }
}

export async function down(knex: Knex) {
  for (const { itemId, weaponId } of weapons) {
    await knex('items').where({ id: itemId }).delete()
    await knex('weapons').where({ id: weaponId }).delete()
  }
}
