import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('inventory_item', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('inventory_id').references('id').inTable('inventories')
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.integer('quantity').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('inventory_item')
}
