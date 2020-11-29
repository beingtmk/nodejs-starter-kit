exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('listing', table => {
      table.integer('category_id');
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('listing', table => table.dropColumn('category_id'))]);
};
