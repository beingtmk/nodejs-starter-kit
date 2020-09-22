import { ORDER_STATES } from '@gqlapp/order-common';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable('order', table => {
        table.increments();

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

        table.string('tracking_id');

        table.timestamps(false, true);
      })

      .createTable('order_state', table => {
        table.increments();
        table
          .integer('order_id')
          .unsigned()
          .references('id')
          .inTable('order')
          .onDelete('CASCADE');

        table.string('state').defaultTo(ORDER_STATES.STALE);

        table.timestamps(false, true);
      })

      .createTable('order_detail', table => {
        table.increments();
        table
          .integer('order_id')
          .unsigned()
          .references('id')
          .inTable('order')
          .onDelete('CASCADE');

        table.string('modal_name');
        table.integer('modal_id');

        table.string('image_url');
        table.string('title');
        table.string('cost');
        table.timestamps(false, true);
      })

      .createTable('order_option', table => {
        table.increments();
        table
          .integer('order_detail_id')
          .unsigned()
          .references('id')
          .inTable('order_detail')
          .onDelete('CASCADE');

        table.integer('quantity');
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order'),
    knex.schema.dropTable('order_state'),
    knex.schema.dropTable('order_detail'),
    knex.schema.dropTable('order_option')
  ]);
};
