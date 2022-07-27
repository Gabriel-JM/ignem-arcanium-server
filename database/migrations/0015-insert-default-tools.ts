import { Knex } from 'knex'
import { makeTools } from '../data/tools'

const tools = makeTools()

export async function up(knex: Knex) {
  for (const data of tools) {
    await knex('items').insert({
      id: data.itemId,
      name: data.name,
      type: 'TOOLS',
      description: data.description,
      price: data.price,
      weight: data.weight,
      rarity: 'COMMON'
    })
  }
}

export async function down(knex: Knex) {
  for (const { itemId } of tools) {
    await knex('items').where({ id: itemId }).delete()
  }
}
