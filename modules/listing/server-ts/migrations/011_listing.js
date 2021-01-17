exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('listing', table => {
        table.increments('id');
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');

        table.string('title');
        table.string('description', 5000);
        table.string('sku');
        table.string('brand');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('listing_flag', table => {
        table.increments();
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');

        table.boolean('is_featured');
        table.boolean('is_new');
        table.boolean('is_discount');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('listing_option', table => {
        table.increments();
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');

        table.integer('fixed_quantity').defaultTo(-1);

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('listing_detail', table => {
        table.increments();
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');

        table.integer('inventory_count');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('listing_medium', table => {
        table.increments();
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');

        table.string('url');
        table.string('type');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
      .createTable('listing_cost', table => {
        table.increments();
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');

        table.integer('cost');
        table.float('discount').defaultTo(0.0);
        table.string('type');
        table.string('label');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
      .createTable('listing_bookmark', table => {
        // blog
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
      .createTable('listing_highlight', table => {
        table.increments();
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');

        table.string('highlight');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('listing_flag'),
    knex.schema.dropTable('listing_option'),
    knex.schema.dropTable('listing_detail'),
    knex.schema.dropTable('listing_medium'),
    knex.schema.dropTable('listing_cost'),
    knex.schema.dropTable('listing_bookmark'),
    knex.schema.dropTable('listing')
  ]);
};
