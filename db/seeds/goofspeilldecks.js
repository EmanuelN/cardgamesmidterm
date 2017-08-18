exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goofspeildeck').del()
    .then(function () {
      // Inserts seed entries
      return knex('goofspeildeck').insert([
        {gameid: 1, suit: 'diamonds'},
        {gameid: 2, suit: 'spades'},
        {gameid: 3, suit: 'diamonds'}
      ]);
    });
}