import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('equipments', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder
      .string('creature_id')
      .notNullable()
      .references('id')
      .inTable('creatures')
    tableBuilder.string('slot_name').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('equipments')
}
