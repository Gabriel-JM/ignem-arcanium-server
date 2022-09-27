import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('creatures', (tableBuilder) => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('name').notNullable()
    tableBuilder.string('icon').notNullable()
    tableBuilder.string('alignment').notNullable()
    tableBuilder.text('description')
    tableBuilder.integer('gold').notNullable()
    tableBuilder.jsonb('status_effects').notNullable()
    tableBuilder.integer('hp').notNullable()
    tableBuilder.integer('mp').notNullable()
    tableBuilder.integer('strength').notNullable()
    tableBuilder.integer('dexterity').notNullable()
    tableBuilder.integer('constitution').notNullable()
    tableBuilder.integer('intelligence').notNullable()
    tableBuilder.integer('wisdom').notNullable()
    tableBuilder.integer('charisma').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('creatures')
}
