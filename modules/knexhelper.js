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
      if(err){
        console.error(err);
      }
      callback(id.toString())
    })
  },
  goofspeilobject: (gameid, player, callback) =>{
    let obj = {p1:{},p2:{},prize:{}}

    //get p1's info (hand, score and staging)
    function p1(cbp1, cbp2) {
      knex('goofspeilp1hands').select('*').where('gameid', gameid)
      .asCallback((err, rows)=>{
        let array = [];
        for (let row in rows[0]){
            if(rows[0][row] === true){
              if (row == 'A'){
                array.unshift(row)
              } else {
              array.push(row);
              }
            }
        }
        if(player == 1){
          obj.p1.suit = rows[0].suit
          obj.p1.cards = array;
          obj.p1.score = rows[0].score;
          obj.p1.stage = rows[0].staging;
        } else {
          obj.p2.suit = rows[0].suit
          obj.p2.cards = array;
          obj.p2.score = rows[0].score;
          obj.p2.stage = rows[0].staging;
        }
        cbp1(cbp2)
      })
    }

    function deck(cb, cb2, cb3){
      knex('goofspeildeck').select('*').where('gameid', gameid)
      .asCallback((err, rows)=>{
        let array = [];
        for (let row in rows[0]){
          if(rows[0][row] === true){
            array.push(row);
          }
        }
        obj.prize.cards = array;
        obj.prize.suit = rows[0].suit;
        cb(cb2, cb3)
      })
    }
    //get p2's info (hand, score and staging)
    function p2(cbp2){
      knex('goofspeilp2hands').select('*').where('gameid', gameid)
      .asCallback((err, rows)=>{
        let array = [];
        for (let row in rows[0]){
          if(rows[0][row] === true){
            if (row == 'A'){
              array.unshift(row)
            } else {
            array.push(row);
           }
          }
        }
        if(player == 2){
          obj.p1.suit = rows[0].suit
          obj.p1.cards = array;
          obj.p1.score = rows[0].score;
          obj.p1.stage = rows[0].staging;
        } else {
          obj.p2.suit = rows[0].suit
          obj.p2.cards = array;
          obj.p2.score = rows[0].score;
          obj.p2.stage = rows[0].staging;
        }
        callback(obj)
      })
    }
    deck(p1, p2, callback);
  }
};



