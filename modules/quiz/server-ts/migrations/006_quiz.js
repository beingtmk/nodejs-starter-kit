exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('quiz', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.boolean('active').defaultTo(false);
      table.string('title');
      table.string('description');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('question', table => {
      table.increments();
      table
        .integer('quiz_id')
        .unsigned()
        .references('id')
        .inTable('quiz')
        .onDelete('CASCADE');
      table.string('description');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('choice', table => {
      table.increments();
      table
        .integer('question_id')
        .unsigned()
        .references('id')
        .inTable('question')
        .onDelete('CASCADE');
      table.string('description');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('answer', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('question_id')
        .unsigned()
        .references('id')
        .inTable('question')
        .onDelete('CASCADE');
      table
        .integer('choice_id')
        .unsigned()
        .references('id')
        .inTable('choice')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('answer'),
    knex.schema.dropTable('choice'),
    knex.schema.dropTable('question'),
    knex.schema.dropTable('quiz')
  ]);
};
