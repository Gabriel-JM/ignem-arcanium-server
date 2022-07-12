import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('torch_registries', (tableBuilder) => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('item_id').references('id').inTable('items')
    tableBuilder.string('inventory_id').references('id').inTable('inventories')
    tableBuilder.integer('charges').notNullable()
    tableBuilder.boolean('is_lit').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('torch_registries')
}
