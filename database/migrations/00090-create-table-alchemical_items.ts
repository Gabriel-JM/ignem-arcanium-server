import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('alchemical_items', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.integer('brew_price').notNullable()
    tableBuilder.string('brew_time').notNullable()
    tableBuilder.text('effects').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('alchemical_items')
}
