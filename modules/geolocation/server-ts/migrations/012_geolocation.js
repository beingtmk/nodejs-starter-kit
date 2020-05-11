exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('geolocation', table => {
      table.increments('id');
      table.float('latitude');
      table.float('longitude');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('geolocation')]);
};
