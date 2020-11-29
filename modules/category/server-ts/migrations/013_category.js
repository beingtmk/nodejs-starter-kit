exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('category', table => {
        table.increments();
        table.string('title');
        table.string('image_url');
        table.string('description');
        table.boolean('is_navbar').defaultTo(false);
        table
          .integer('parent_category_id')
          .unsigned()
          .references('id')
          .inTable('category')
          .onDelete('CASCADE');
        table.boolean('is_leaf').defaultTo(true);

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('modal_category', table => {
        table.increments();
        table.string('modal_name');
        table
          .integer('category_id')
          .unsigned()
          .references('id')
          .inTable('category')
          .onDelete('CASCADE');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('modal_category'), knex.schema.dropTable('category')]);
};
