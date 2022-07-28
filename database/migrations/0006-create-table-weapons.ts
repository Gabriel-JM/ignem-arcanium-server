import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('weapons', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.jsonb('damage').notNullable()
    tableBuilder.jsonb('properties').notNullable()
    tableBuilder.integer('initiative_modifier').notNullable()
    tableBuilder.integer('distance').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('weapons')
}
