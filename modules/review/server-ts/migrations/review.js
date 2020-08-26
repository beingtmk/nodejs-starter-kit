exports.up = function(knex) {
  return Promise.all([
    // Modal link tables
    knex.schema
      .createTable('event', table => {
        table.increments();
        table.string('title');
        table.timestamps(false, true);
      })
      .createTable('blog', table => {
        table.increments();
        table.string('title');
        table.timestamps(false, true);
      })

      // Modals
      .createTable('event_review', table => {
        table.increments();
        table
          .integer('event_id')
          .unsigned()
          .references('id')
          .inTable('event')
          .onDelete('CASCADE');
        table
          .integer('review_id')
          .unsigned()
          .references('id')
          .inTable('review')
          .onDelete('CASCADE');
        table.timestamps(false, true);
      })
      .createTable('blog_review', table => {
        table.increments();
        table
          .integer('blog_id')
          .unsigned()
          .references('id')
          .inTable('blog')
          .onDelete('CASCADE');
        table
          .integer('review_id')
          .unsigned()
          .references('id')
          .inTable('review')
          .onDelete('CASCADE');
        table.timestamps(false, true);
      })

      // Original table
      .createTable('review', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('feedback');
        table.integer('rating');
        table.timestamps(false, true);
      })
    // .createTable('review_image', table => {
    //   table.increments();
    //   table
    //     .integer('review_id')
    //     .unsigned()
    //     .references('id')
    //     .inTable('review')
    //     .onDelete('CASCADE');
    //   table.string('image_url');
    //   table.timestamps(false, true);
    // })
    // .createTable('rating', table => {
    //   table.increments();
    //   table
    //     .integer('user_id')
    //     .unsigned()
    //     .references('id')
    //     .inTable('user')
    //     .onDelete('CASCADE');
    //   table.integer('one').defaultTo(0);
    //   table.integer('two').defaultTo(0);
    //   table.integer('three').defaultTo(0);
    //   table.integer('four').defaultTo(0);
    //   table.integer('five').defaultTo(0);
    //   table.timestamps(false, true);
    // }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('review'),
    knex.schema.dropTable('event'),
    knex.schema.dropTable('blog'),
    knex.schema.dropTable('event_review'),
    knex.schema.dropTable('blog_review')
  ]);
};
