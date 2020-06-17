exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('group', table => {
        table.increments('id');
        table.string('title');
        table.string('avatar');
        table.string('description');
        table.string('group_type');
        table.timestamps(false, true);
      })
      .createTable('group_member', table => {
        table.increments('id');
        table.string('email');
        table.string('type');
        table.string('status');
        table
          .integer('group_id')
          .unsigned()
          .references('id')
          .inTable('group')
          .onDelete('CASCADE');
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('group'), knex.schema.dropTable('group_member')]);
};
