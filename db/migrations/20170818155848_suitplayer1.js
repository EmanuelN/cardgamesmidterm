
exports.up = function(knex, Promise) {
  return knex.schema.table('goofspeilp1hands', function (table) {
    table.string('suit');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('goofspeilp1hands', function (table) {
   table.dropColumn('suit');
  })
};
