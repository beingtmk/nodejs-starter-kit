exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('discount', table => {
        table.increments('id');

        table.string('modal_name');
        table.integer('modal_id');
        table.float('discount_percent').defaultTo(0.0);

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })

      .createTable('discount_duration', table => {
        table.increments();
        table
          .integer('discount_id')
          .unsigned()
          .references('id')
          .inTable('discount')
          .onDelete('CASCADE');

        table.string('start_date');
        table.string('end_date');

        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('discount_duration'), knex.schema.dropTable('discount')]);
};
