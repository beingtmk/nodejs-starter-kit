exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('blog_tag', table => {
      table.increments('id');
      table.string('text');
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
  return Promise.all([knex.schema.dropTable('blog_tag')]);
};
