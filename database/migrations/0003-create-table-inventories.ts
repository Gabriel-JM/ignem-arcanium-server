import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('inventories', (tableBuilder) => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.integer('size').notNullable()
    tableBuilder.integer('size_in_use').defaultTo(0)
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('inventories')
}
