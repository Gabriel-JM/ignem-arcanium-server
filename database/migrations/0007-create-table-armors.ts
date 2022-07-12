import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('armors', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.string('damage_reduction').notNullable()
    tableBuilder.jsonb('damage_type').notNullable()
    tableBuilder.jsonb('properties').notNullable()
    tableBuilder.integer('initiative_modifier').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('armors')
}
