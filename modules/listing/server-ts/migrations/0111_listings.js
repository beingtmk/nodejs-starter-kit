exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('listing', table => {
      table
        .string('description', 5000)
        .notNullable()
        .defaultTo(1)
        .alter();
    })
  ]);
};
exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('listing')]);
};
