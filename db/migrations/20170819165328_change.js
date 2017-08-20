
exports.up = function(knex, Promise) {
  return knex.schema.table('goofspeilp2hands', function (table) {
    table.dropColumn('A');
    table.boolean('1').defaultTo(true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('goofspeilp2hands', function (table) {
    table.dropColumn('1');
    table.boolean('A').defaultTo(true);
  })
};
