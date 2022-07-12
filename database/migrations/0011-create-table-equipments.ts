import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('equipments', tableBuilder => {
    tableBuilder.string('id').primary().notNullable()
    tableBuilder.string('first_hand_item_id').references('id').inTable('items')
    tableBuilder.string('second_hand_item_id').references('id').inTable('items')
    tableBuilder.string('armor_id').references('id').inTable('items')
    tableBuilder.string('first_accessory_id').references('id').inTable('items')
    tableBuilder.string('second_accessory_id').references('id').inTable('items')
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('equipments')
}
