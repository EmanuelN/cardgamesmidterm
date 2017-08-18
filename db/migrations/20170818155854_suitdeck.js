
exports.up = function(knex, Promise) {
  return knex.schema.table('goofspeildeck', function (table) {
    table.string('suit');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('goofspeildeck', function (table) {
   table.dropColumn('suit');
  })
};
