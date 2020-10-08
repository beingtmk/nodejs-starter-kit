exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('dynamic_carousel', table => {
      table.increments();
      table.string('title');
      table.string('description', 500);
      table.string('link');
      table.string('label');
      table.string('image_url');
      table.boolean('is_active').default(true);
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('dynamic_carousel')]);
};
