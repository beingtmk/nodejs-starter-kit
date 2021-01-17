import DELIVERY from '@gqlapp/order-common/Delivery';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable('order_state', table => {
        table.increments();

        table.string('state');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('order', table => {
        table.increments();

        table
          .integer('consumer_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table
          .integer('order_state_id')
          .unsigned()
          .references('id')
          .inTable('order_state')
          .onDelete('CASCADE');

        table.string('tracking_id');

        table.boolean('is_active').defaultTo(true);
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
        table
          .integer('vendor_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table
          .integer('order_detail_state_id')
          .unsigned()
          .references('id')
          .inTable('order_state')
          .onDelete('CASCADE');

        table.string('modal_name');
        table.integer('modal_id');

        table.string('image_url');
        table.string('title');
        table.string('cost');

        table.boolean('is_active').defaultTo(true);
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

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
      .createTable('order_delivery', table => {
        table.increments();
        table
          .integer('order_detail_id')
          .unsigned()
          .references('id')
          .inTable('order_detail')
          .onDelete('CASCADE');

        table
          .integer('address_id')
          .unsigned()
          .references('id')
          .inTable('user_address')
          .onDelete('CASCADE');

        table.string('type').defaultTo(DELIVERY.default);

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_delivery'),
    knex.schema.dropTable('order_option'),
    knex.schema.dropTable('order_detail'),
    knex.schema.dropTable('order'),
    knex.schema.dropTable('order_state')
  ]);
};
