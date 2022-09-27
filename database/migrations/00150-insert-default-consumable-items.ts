import { Knex } from 'knex'
import { makeConsumableItems } from '../data/consumable-items.js'

const consumables = makeConsumableItems()

export async function up(knex: Knex) {
  for (const data of consumables) {
    await knex('items').insert({
      id: data.itemId,
      name: data.name,
      type: 'CONSUMABLE',
      description: data.description,
      price: data.price,
      weight: data.weight,
      rarity: 'COMMON'
    })
  }
}

export async function down(knex: Knex) {
  for (const { itemId } of consumables) {
    await knex('items').where({ id: itemId }).delete()
  }
}
