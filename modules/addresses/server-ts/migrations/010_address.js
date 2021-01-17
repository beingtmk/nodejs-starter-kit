exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('user_address', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(false, true);

      table.string('first_name');
      table.string('last_name');
      table.string('mobile');

      table.string('street_address1');
      table.string('street_address2');
      table.string('state');
      table.string('city');
      table.string('country');
      table.string('pin_code');

      table.boolean('is_default').defaultTo(false);
      table.boolean('is_active').defaultTo(true);
    })
  ]);
};
exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('user_address')]);
};
