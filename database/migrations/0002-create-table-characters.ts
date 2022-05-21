import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('characters', (tableBuilder) => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('name').notNullable()
    tableBuilder.string('icon').notNullable()
    tableBuilder.integer('level').notNullable()
    tableBuilder.integer('gold').notNullable()
    tableBuilder.integer('hp').notNullable()
    tableBuilder.integer('mp').notNullable()
    tableBuilder.integer('strength').notNullable()
    tableBuilder.integer('dexterity').notNullable()
    tableBuilder.integer('constitution').notNullable()
    tableBuilder.integer('intelligence').notNullable()
    tableBuilder.integer('wisdom').notNullable()
    tableBuilder.integer('charism').notNullable()
    tableBuilder.string('account_id').references('id').inTable('accounts')
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('characters')
}
