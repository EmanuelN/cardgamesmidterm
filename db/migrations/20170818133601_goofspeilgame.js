exports.up = function(knex, Promise) {
  return knex.schema.createTable('goofspeilp1hands', function (table) {
    table.integer('gameid');
    table.boolean('A').defaultTo(true);
    table.boolean('2').defaultTo(true);
    table.boolean('3').defaultTo(true);
    table.boolean('4').defaultTo(true);
    table.boolean('5').defaultTo(true);
    table.boolean('6').defaultTo(true);
    table.boolean('7').defaultTo(true);
    table.boolean('8').defaultTo(true);
    table.boolean('9').defaultTo(true);
    table.boolean('10').defaultTo(true);
    table.boolean('J').defaultTo(true);
    table.boolean('Q').defaultTo(true);
    table.boolean('K').defaultTo(true);
    table.integer('score').defaultTo(0)
    table.string('staging')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('goofspeilp1hands');
};
