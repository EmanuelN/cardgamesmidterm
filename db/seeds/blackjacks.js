
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blackjacks').del()
    .then(function () {
      // Inserts seed entries
      return knex('blackjacks').insert([
        {id: 1, player1_id: 1, player2_id: 2, winner_id: 2},
        {id: 2, player1_id: 2, player2_id: 3, winner_id: 2},
        {id: 3, player1_id: 1, player2_id: 3, winner_id: 2},
        {id: 4, player1_id: 2, player2_id: 1, winner_id: 1},
        {id: 5, player1_id: 3, player2_id: 2, winner_id: 3},
        {id: 6, player1_id: 1, player2_id: 2, winner_id: 1}
      ]);
    });
}