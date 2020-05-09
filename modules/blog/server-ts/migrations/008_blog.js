exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('model', table => {
        table.increments('id');
        table.string('name');
        table.string('image');
        table.string('desc');
        table.timestamps(false, true);
      })
      .createTable('blog', table => {
        table.increments('id');
        table.string('title');
        table.string('image');
        table.string('content');
        table
          .integer('author_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table
          .integer('model_id')
          .unsigned()
          .references('id')
          .inTable('model')
          .onDelete('CASCADE');
        table.string('status').defaultTo('published');
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('model'), knex.schema.dropTable('blog')]);
};
