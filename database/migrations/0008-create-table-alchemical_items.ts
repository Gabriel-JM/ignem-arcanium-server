import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('alchemical_items', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.string('inventory_id').references('id').inTable('inventories')
    tableBuilder.integer('brew_price').notNullable()
    tableBuilder.integer('brew_time').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('alchemical_items')
}
