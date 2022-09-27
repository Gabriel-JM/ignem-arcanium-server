import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('characters', (tableBuilder) => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.integer('level').notNullable()
    tableBuilder.integer('experience').notNullable()
    tableBuilder.integer('character_points').notNullable()
    tableBuilder
      .string('account_id')
      .notNullable()
      .references('id')
      .inTable('accounts')
    tableBuilder
      .string('creature_id')
      .notNullable()
      .references('id')
      .inTable('creatures')
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('characters')
}
