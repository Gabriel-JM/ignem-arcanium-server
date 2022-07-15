import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('gems', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.integer('magic_tier').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('gems')
}
