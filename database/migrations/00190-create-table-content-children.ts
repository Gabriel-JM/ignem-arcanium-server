import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('content_children', tableBuilder => {
    tableBuilder.string('parentId')
      .references('id')
      .inTable('contents')
      .notNullable()
    tableBuilder.string('childId')
      .references('id')
      .inTable('contents')
      .notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('items')
}
