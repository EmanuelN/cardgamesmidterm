require('dotenv').config();
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

module.exports = {
  goofspeil: function goofspeilsRankings(callback){
    knex.select('name as player').count('winner_id as wins')
    .from('users')
    .innerJoin('goofspeils', 'users.id', 'winner_id')
    .groupBy('name').orderBy('wins', 'desc')
    .asCallback ((err, rows) => {
      if (err){
        console.error(err);
      } else {
        callback(null, rows);
      }
      // return knex.destroy();
    });
  },
  name: (callback)=> {knex.select('name').from('users').where({id: 1})
    .asCallback((err, rows) => {
      if (err){
      console.error(err)
    } else{
      callback(null, rows[0]);
    }
      // return knex.destroy();
    });
  },
  blackjack: (callback) => {
    knex.select('name as player').count('winner_id as wins')
    .from('users')
    .innerJoin('blackjacks', 'users.id', 'winner_id')
    .groupBy('name').orderBy('wins', 'desc')
    .asCallback ((err, rows) => {
      if (err){
        console.error(err);
      } else {
        callback(null, rows);
        }
      });
      // return knex.destroy();
    }
};


