import { Knex } from 'knex'
import { ItemRarities, ItemTypes } from '../constants/items.js'
import { makeConsumableItems } from '../data/consumable-items.js'

const consumables = makeConsumableItems()

export async function up(knex: Knex) {
  for (const data of consumables) {
    await knex('items').insert({
      id: data.itemId,
      name: data.name,
      type: ItemTypes.consumable,
      description: data.description,
      price: data.price,
      weight: data.weight,
      rarity: ItemRarities.common
    })
  }
}

export async function down(knex: Knex) {
  for (const { itemId } of consumables) {
    await knex('items').where({ id: itemId }).delete()
  }
}
