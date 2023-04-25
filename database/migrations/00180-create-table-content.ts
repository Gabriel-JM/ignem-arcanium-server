import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('contents', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('ownerId').notNullable()
    tableBuilder.string('icon')
    tableBuilder.string('cover')
    tableBuilder.string('name').notNullable()
    tableBuilder.jsonb('properties').notNullable()
    tableBuilder.text('value').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('items')
}
