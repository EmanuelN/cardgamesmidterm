exports.up = function(knex, Promise) {
  return knex.schema.createTable('blackjacks', function (table) {
    table.increments();
    table.integer('player1_id');
    table.integer('player2_id');
    table.integer('winner_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blackjacks');
};
