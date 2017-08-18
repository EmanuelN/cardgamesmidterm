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
  },
  addpt: (callback, player1, player2, winnerid, table) =>{
    knex.insert({player1_id: player1, player2_id: player2, winner_id: winnerid})
    .into(table)
    .then((err)=>{
      if(err){
        console.error(err);
        callback();
      }else{
        console.log('working')
        callback();
      }
    });
  },

  matchmaking: (game, player2, callback) =>{
    const subquery = knex(game+'s').select('id').where({player2_id: null});

    knex(game).select('*').whereIn('id', subquery)
    .asCallback((err, rows) => {
      if (err){
        console.error(err);
      } else {
        knex('test').where({id: rows[0].id})
        .update({player2_id: player2})
        .then(callback(rows[0].id.toString()))
      }
    })
  },
  creatematch: (game, player1, callback) =>{
    knex(game+'s').returning('id')
    .insert({player1_id: player1})
    .asCallback((err, id)=>{
      callback(id.toString())
    })
  }

};


