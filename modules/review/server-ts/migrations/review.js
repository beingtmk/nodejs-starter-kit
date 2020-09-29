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
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('review'),
    knex.schema.dropTable('event_review'),
    knex.schema.dropTable('blog_review')
  ]);
};
