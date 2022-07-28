import { Knex } from 'knex'
import { makeShieldsAndArmors } from '../data/shields-and-armors'

const shieldsAndArmors = makeShieldsAndArmors()

export async function up(knex: Knex) {
  for (const data of shieldsAndArmors) {
    await knex('items').insert({
      id: data.itemId,
      name: data.name,
      type: data.type,
      description: data.description,
      price: data.price,
      weight: data.weight,
      rarity: 'COMMON'
    })
  
    await knex('shields_armors').insert({
      id: data.shieldArmorId,
      item_id: data.itemId,
      damage_reduction: data.damageReduction,
      properties: data.properties,
      initiative_modifier: data.initiativeModifier
    })
  }
}

export async function down(knex: Knex) {
  for (const { itemId, shieldArmorId } of shieldsAndArmors) {
    await knex('items').where({ id: itemId }).delete()
    await knex('shields_armors').where({ id: shieldArmorId }).delete()
  }
}
