
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goofspeilp1hands').del()
    .then(function () {
      // Inserts seed entries
      return knex('goofspeilp1hands').insert([
        {gameid: 1},
        {gameid: 2},
        {gameid: 3}
      ]);
    });
}