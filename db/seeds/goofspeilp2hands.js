
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goofspeilp2hands').del()
    .then(function () {
      // Inserts seed entries
      return knex('goofspeilp2hands').insert([
        {gameid: 1, suit: 'hearts'},
        {gameid: 2, suit: 'diamonds'},
        {gameid: 3, suit: 'spades'}
      ]);
    });
}