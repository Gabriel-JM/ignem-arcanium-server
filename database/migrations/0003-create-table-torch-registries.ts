import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('torch_registries', (tableBuilder) => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('character_name').notNullable()
    tableBuilder.integer('torch_count').notNullable()
    tableBuilder.integer('torch_charge').notNullable()
    tableBuilder.boolean('is_lit').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('torch_registries')
}
