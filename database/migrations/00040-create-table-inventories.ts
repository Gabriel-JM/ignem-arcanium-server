import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('inventories', (tableBuilder) => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.integer('size').notNullable()
    tableBuilder.integer('space_in_use').defaultTo(0)
    tableBuilder
      .string('creature_id')
      .notNullable()
      .references('id')
      .inTable('creatures')
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('inventories')
}
