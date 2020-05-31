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
        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
      .createTable('listing_image', table => {
        table.increments();
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');
        table.string('image_url');
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
        table.timestamps(false, true);
      })
  ]);
};
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('listing'),
    knex.schema.dropTable('listing_image'),
    knex.schema.dropTable('listing_cost'),
    knex.schema.dropTable('listing_bookmark')
  ]);
};
