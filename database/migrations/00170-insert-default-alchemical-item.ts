import { Knex } from 'knex'
import { makeAlchemicalItems } from '../data/alchemical-items.js'

const alchemicalItems = makeAlchemicalItems()

export async function up(knex: Knex) {
  for (const data of alchemicalItems) {
    await knex('items').insert({
      id: data.itemId,
      name: data.name,
      type: data.type,
      sub_type: data.subType,
      description: data.description,
      price: data.price,
      weight: data.weight,
      rarity: data.rarity
    })
  
    await knex('alchemical_items').insert({
      id: data.alchemicalItemId,
      item_id: data.itemId,
      brew_price: data.brewPrice,
      brew_time: data.brewTime,
      effects: data.effects
    })
  }
}

export async function down(knex: Knex) {
  for (const { itemId, alchemicalItemId } of alchemicalItems) {
    await knex('items').where({ id: itemId }).delete()
    await knex('alchemical_items').where({ id: alchemicalItemId }).delete()
  }
}
