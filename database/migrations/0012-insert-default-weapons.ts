import { Knex } from 'knex'
import { makeWeapons } from '../data/weapons'

const weapons = makeWeapons()

export async function up(knex: Knex) {
  for (const data of weapons) {
    await knex('items').insert({
      id: data.itemId,
      name: data.name,
      type: 'WEAPON',
      description: data.description,
      price: data.price,
      weight: data.weight,
      rarity: 'COMMON'
    })
  
    await knex('weapons').insert({
      id: data.weaponId,
      item_id: data.itemId,
      damage: data.damage,
      damage_type: data.damage_type,
      properties: data.properties,
      initiative_modifier: data.initiative_modifier,
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
