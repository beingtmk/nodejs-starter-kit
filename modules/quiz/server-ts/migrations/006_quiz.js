exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("quiz", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table.string('state');
      table.boolean("active").defaultTo(false);
      table.string("title");
      table.string("description");
      table.boolean("is_editable_by_user").defaultTo(false);
      table.timestamps(false, true);
    }),
    knex.schema.createTable("section", (table) => {
      table.increments();
      table
        .integer("quiz_id")
        .unsigned()
        .references("id")
        .inTable("quiz")
        .onDelete("CASCADE");
      table.string("title");
      table.string('description');
      table.boolean("is_active").defaultTo(true);
      table.timestamps(false, true);
    }),
    knex.schema.createTable("question", (table) => {
      table.increments();
      table
        .integer("section_id")
        .unsigned()
        .references("id")
        .inTable("section")
        .onDelete("CASCADE");
      table.string("description");
      table.integer("dependent_question_id");
      table.integer("dependent_choice_id");
      table.string("choice_type");
      table.boolean("is_active").defaultTo(true);
      table.timestamps(false, true);
    }),
    knex.schema.createTable("choice", (table) => {
      table.increments();
      table
        .integer("question_id")
        .unsigned()
        .references("id")
        .inTable("question")
        .onDelete("CASCADE");
      table.string("description");
      table.timestamps(false, true);
    }),
    knex.schema.createTable("attempt", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table
        .integer("quiz_id")
        .unsigned()
        .references("id")
        .inTable("quiz")
        .onDelete("CASCADE");
      table.timestamps(false, true);
    }),
    knex.schema.createTable("answer", (table) => {
      table.increments();
      table
        .integer("attempt_id")
        .unsigned()
        .references("id")
        .inTable("attempt")
        .onDelete("CASCADE");
      table
        .integer("question_id")
        .unsigned()
        .references("id")
        .inTable("question")
        .onDelete("CASCADE");
      table
        .integer("choice_id")
        .unsigned()
        .references("id")
        .inTable("choice")
        .onDelete("CASCADE");
      table.string("content");
      table.timestamps(false, true);
    }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable("answer"),
    knex.schema.dropTable("attempt"),
    knex.schema.dropTable("choice"),
    knex.schema.dropTable("question"),
    knex.schema.dropTable("section"),
    knex.schema.dropTable("quiz"),
  ]);
};
