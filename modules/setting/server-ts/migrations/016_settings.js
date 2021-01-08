exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('platform', table => {
        table.increments('id');

        table.string('name');
        table.string('logo');
        table.string('type');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('platform_info', table => {
        table.increments();
        table
          .integer('platform_id')
          .unsigned()
          .references('id')
          .inTable('platform')
          .onDelete('CASCADE');

        table.string('mobile');
        table.string('email');
        table.string('address');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('platform_social', table => {
        table.increments();
        table
          .integer('platform_id')
          .unsigned()
          .references('id')
          .inTable('platform')
          .onDelete('CASCADE');

        table.string('youtube');
        table.string('facebook');
        table.string('instagram');
        table.string('linked_in');
        table.string('twitter');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('platform'),
    knex.schema.dropTable('platform_info'),
    knex.schema.dropTable('platform_social')
  ]);
};
