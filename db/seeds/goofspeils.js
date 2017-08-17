
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goofspeils').del()
    .then(function () {
      // Inserts seed entries
      return knex('goofspeils').insert([
        {id: 1, player1_id: 1, player2_id: 2, winner_id: 2},
        {id: 2, player1_id: 2, player2_id: 3, winner_id: 2},
        {id: 3, player1_id: 1, player2_id: 3, winner_id: 3},
      ]);
    });
};
