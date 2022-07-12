import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('inventory_item', tableBuilder => {
    tableBuilder.string('inventory_id').references('id').inTable('inventories')
    tableBuilder.string('item_id').references('id').inTable('items')
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('inventory_item')
}
