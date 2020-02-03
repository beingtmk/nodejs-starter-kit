exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('events', table => {
        table.increments('id');
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('title');
        table.string('details');
        table.string('venue');
        table.string('date');
        table.string('time');
        // table
        //   .integer('admins_id')
        //   .unsigned()
        //   .references('event_id')
        //   .inTable('admins')
        //   .onDelete('CASCADE');
        table.timestamps(false, true);
      })
      .createTable('admins', table => {
        table.increments();
        table
          .integer('event_id')
          .unsigned()
          .references('id')
          .inTable('events')
          .onDelete('CASCADE');
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('username');
        table.string('contact_info');
        table.timestamps(false, true);
      })
      .createTable('participants', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table
          .integer('event_id')
          .unsigned()
          .references('id')
          .inTable('events')
          .onDelete('CASCADE');
        table.timestamps(false, true);
      })
  ]);
};
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('events'),
    knex.schema.dropTable('admins'),
    knex.schema.dropTable('participants')
  ]);
};
