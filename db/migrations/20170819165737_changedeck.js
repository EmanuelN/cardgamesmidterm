
exports.up = function(knex, Promise) {
  return knex.schema.table('goofspeildeck', function (table) {
    table.dropColumn('J')
    table.boolean('11').defaultTo(true);
    table.dropColumn('Q')
    table.boolean('12').defaultTo(true);
    table.dropColumn('K')
    table.boolean('13').defaultTo(true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('goofspeildeck', function (table) {
    table.dropColumn('11')
    table.boolean('J').defaultTo(true);
    table.dropColumn('12')
    table.boolean('Q').defaultTo(true);
    table.dropColumn('K')
    table.boolean('13').defaultTo(true);
  })
};