exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('content_comment', table => {
        table.increments('id');
        table.string('content');
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.timestamps(false, true);
      })
      .createTable('blog_comment', table => {
        table.increments('id');
        table
          .integer('blog_id')
          .unsigned()
          .references('id')
          .inTable('blog')
          .onDelete('CASCADE');
        table
          .integer('comment_id')
          .unsigned()
          .references('id')
          .inTable('content_comment')
          .onDelete('CASCADE');
        table.timestamps(false, true);
      })
      .createTable('reply_comment', table => {
        table.increments('id');
        table
          .integer('reference_id')
          .unsigned()
          .references('id')
          .inTable('content_comment')
          .onDelete('CASCADE');
        table
          .integer('comment_id')
          .unsigned()
          .references('id')
          .inTable('content_comment')
          .onDelete('CASCADE');
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('reply_comment'),
    knex.schema.dropTable('blog_comment'),
    knex.schema.dropTable('content_comment')
  ]);
};
