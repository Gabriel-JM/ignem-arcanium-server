import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('weapons', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.string('inventory_id').references('id').inTable('inventories')
    tableBuilder.string('damage').notNullable()
    tableBuilder.string('damage_type').notNullable()
    tableBuilder.jsonb('properties').notNullable()
    tableBuilder.integer('initiative_modifier').notNullable()
    tableBuilder.integer('distance').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('weapons')
}
