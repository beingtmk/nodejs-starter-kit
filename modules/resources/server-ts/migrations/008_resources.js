exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('resources', table => {
        table.increments('id');
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('title');
        table.string('description');
        table.string('uploaded_by');
        table.string('tags');
        table.timestamps(false, true);
      })
      .createTable('resource', table => {
        table.increments('id');
        table
          .integer('resource_id')
          .unsigned()
          .references('id')
          .inTable('resources')
          .onDelete('CASCADE');
        table.string('resource_url');
        table.timestamps(false, true);
      })
  ]);
};
exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('resources'), knex.schema.dropTable('resource')]);
};
