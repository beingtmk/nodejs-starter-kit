import { STALE } from '../constants/order_states';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('order', table => {
      table.increments('id');
      table
        .integer('consumer_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('vendor_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.string('state').defaultTo(STALE);
      table.timestamps(false, true);
    }),

    // Order Details
    knex.schema.createTable('order_detail', table => {
      table.increments('id');

      table.integer('cost');
      table.integer('quantity');

      table.string('title');
      table.string('thumbnail');
      table.string('date');

      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('order')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })

    // Order Delivery Table
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('order_detail'), knex.schema.dropTable('order')]);
};
