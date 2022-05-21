import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('accounts', (tableBuilder) => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('name').notNullable()
    tableBuilder.string('email').unique().notNullable()
    tableBuilder.string('password').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('accounts')
}
