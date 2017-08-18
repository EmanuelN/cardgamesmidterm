
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goofspeilp1hands').del()
    .then(function () {
      // Inserts seed entries
      return knex('goofspeilp1hands').insert([
        {gameid: 1, suit: 'spades'},
        {gameid: 2, suit: 'hearts'},
        {gameid: 3, suit: 'clubs'}
      ]);
    });
}