import { Knex } from 'knex'
import { ItemRarities, ItemTypes } from '../../src/domain/constants/index.js'
import { makeTools } from '../data/tools.js'

const tools = makeTools()

export async function up(knex: Knex) {
  for (const data of tools) {
    await knex('items').insert({
      id: data.itemId,
      name: data.name,
      type: ItemTypes.tool,
      description: data.description,
      price: data.price,
      weight: data.weight,
      rarity: ItemRarities.common
    })
  }
}

export async function down(knex: Knex) {
  for (const { itemId } of tools) {
    await knex('items').where({ id: itemId }).delete()
  }
}
