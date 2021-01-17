exports.up = function(knex) {
  return Promise.all([
    knex.schema

      // Original table
      .createTable('review', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('feedback', 5000);
        table.string('rating');
        table.integer('helpful').defaultTo(0);
        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      // Modal
      .createTable('modal_review', table => {
        table.increments();
        table.string('modal_name');
        table.integer('modal_id');
        table
          .integer('review_id')
          .unsigned()
          .references('id')
          .inTable('review')
          .onDelete('CASCADE');
        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('review_medium', table => {
        table.increments();
        table
          .integer('review_id')
          .unsigned()
          .references('id')
          .inTable('review')
          .onDelete('CASCADE');

        table.string('url');
        table.string('type');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
      .createTable('average_rating', table => {
        table.increments();
        table.string('modal_name');
        table.integer('modal_id');
        // table
        //   .integer('review_id')
        //   .unsigned()
        //   .references('id')
        //   .inTable('review')
        //   .onDelete('CASCADE');
        table.integer('one').defaultTo(0);
        table.integer('two').defaultTo(0);
        table.integer('three').defaultTo(0);
        table.integer('four').defaultTo(0);
        table.integer('five').defaultTo(0);
        table.float('rating').defaultTo(0);
        table.timestamps(false, true);
      })
      .createTable('review_helpful_user', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table
          .integer('review_id')
          .unsigned()
          .references('id')
          .inTable('review')
          .onDelete('CASCADE');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('modal_review'),
    knex.schema.dropTable('review_medium'),
    knex.schema.dropTable('average_rating'),
    knex.schema.dropTable('review_helpful_user'),
    knex.schema.dropTable('review')
  ]);
};
