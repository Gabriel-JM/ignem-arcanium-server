import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('shields_armors', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.jsonb('damage_reduction').notNullable()
    tableBuilder.jsonb('properties').notNullable()
    tableBuilder.integer('initiative_modifier').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('shields_armors')
}
