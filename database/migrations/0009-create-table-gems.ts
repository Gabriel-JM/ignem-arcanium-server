import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('gems', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.string('inventory_id').references('id').inTable('inventories')
    tableBuilder.integer('magic_tier').notNullable()
    tableBuilder.boolean('known').defaultTo(false)
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('gems')
}
