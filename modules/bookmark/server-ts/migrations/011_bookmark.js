exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('blog_bookmark', table => {
      table.increments('id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('blog_id')
        .unsigned()
        .references('id')
        .inTable('blog')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('blog_bookmark')]);
};
