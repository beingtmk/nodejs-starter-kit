exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('like', table => {
      table.increments('id');
      table.string('type');
      table.string('type_id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('like')]);
};
