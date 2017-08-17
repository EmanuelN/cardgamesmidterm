require('dotenv').config();

console.log('Searching....');

const knex = require('knex')({
  client: 'pg',
  connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      // ssl      : process.env.DB_SSL
  }
});

// knex.select('name').from('users').where({id: 1})
//   .asCallback((err, rows) => {
//     if (err){
//     console.error(err)
//   } else{
//     console.log(rows[0].name)
//   }
//     return knex.destroy();
// });
let rankings = {};
knex.select('name as player').count('winner_id as wins')
.from('users')
.innerJoin('blackjacks', 'users.id', 'winner_id')
.groupBy('name').orderBy('wins', 'desc')
.asCallback ((err, rows) => {
  if (err){
    console.error(err);
  } else {
    for (let row in rows){
      rankings[row] = {
        player: rows[row].player,
        wins: rows[row].wins
      };
    }console.log(rankings);
  }
  return knex.destroy();
});
