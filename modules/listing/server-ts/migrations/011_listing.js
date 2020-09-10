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
        table.string('description');
        table.integer('inventory_count');

        table.boolean('is_featured');
        table.boolean('is_new');
        table.boolean('is_discount');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
      .createTable('listing_media', table => {
        table.increments();
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');

        table.string('url'); // could represent image or video

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
        table.float('daily_discount');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
      .createTable('listing_bookmark', table => {
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
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('listing'),
    knex.schema.dropTable('listing_media'),
    knex.schema.dropTable('listing_cost'),
    knex.schema.dropTable('listing_bookmark')
  ]);
};
