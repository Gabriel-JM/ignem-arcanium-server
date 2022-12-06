import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('items', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('name').notNullable()
    tableBuilder.string('type').notNullable()
    tableBuilder.string('sub_type')
    tableBuilder.text('description').notNullable()
    tableBuilder.integer('price').notNullable()
    tableBuilder.integer('weight').notNullable()
    tableBuilder.string('rarity').notNullable()
    tableBuilder.integer('charges').defaultTo(0)
    tableBuilder.jsonb('requirements')
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('items')
}
