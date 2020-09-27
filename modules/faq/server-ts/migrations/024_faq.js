
exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('faq', table => {
        table.increments('id');
        table.string('question');
        table.string('answer');
        table.boolean('is_featured').defaultTo(false);
        table.timestamps(false, true);
      })
  ]);
};
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('faq'),
  ]);
};
