//dotenv is a zero dependency module,
//loads environment variables from a .env file into
//process.env
require('dotenv').config();
//knex is a sql query builder, here we use it for Postgres
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
    //here we create a goofspeilRankings function that counts how many
    //times a users id is present in winner_id. The greater the wins, the
    //higher the users rank, arranged with greatest number of wins first
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
    //same scoring function as above except this time, we apply this on
    //for the game blackjack
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
  //adds both of the players id's into the table as well as the winner
  // of the game between the two players
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
  //matchmaking function, works on the logic that if there is no player2
  //you become player2 and join an already created game
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

  //creatematch function, works on the logic that if you create a new game,
  //you take on the id of player1
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

  goofspeilplaycard: (gameid, player, cardid, callback)=>{
    knex(`goofspeilp${[player]}hands`)
    .where({gameid: gameid})
    .update({[cardid]: false})
    .asCallback((err, rows)=>{
      if(err){
        console.error(err);
      }
      knex(`goofspeilp${[player]}hands`)
      .where({gameid: gameid})
      .update({staging: cardid})
      .asCallback(function(){
        callback()
      })
    })
  },

  goofspeilobject: (gameid, player, callback) =>{
    let obj = {p1:{},p2:{},prize:{}}
    //intializes an object consisting of objects that contains all the
    //characteristics for the players as well as for the prize
    function p1(cbp1, cbp2) {
      knex('goofspeilp1hands').select('*').where('gameid', gameid)
      .asCallback((err, rows)=>{
        let array = [];
        //row is card, pushes card into the array (which is your hand)
        //function is used to ensure that the 'A' shows up as the first
        //card in the users hand
        for (let row in rows[0]){
            if(rows[0][row] === true){
              array.push(row);
            }
        }
        //If the player is player1, then the player1 suit, score, cards and
        //stage card get updated.
        //The stage card is the card that is currently being played by the
        //player during 'this' turn
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
    //this function deals with the characteristics of the deck
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
        obj.gameid = gameid;
        obj.playerid = player;
        obj.prize.suit = rows[0].suit;
        cb(cb2, cb3)
      })
    }
    //If the player is player1, then the player1 suit, score, cards and
    //stage card get updated.
    //The stage card is the card that is currently being played by the
    //player during 'this' turn
    function p2(cbp2){
      knex('goofspeilp2hands').select('*').where('gameid', gameid)
      .asCallback((err, rows)=>{
        let array = [];
        //row is card, pushes card into the array (which is your hand)
        //function is used to ensure that the 'A' shows up as the first
        //card in the users hand
        for (let row in rows[0]){
          if(rows[0][row] === true){
            array.push(row);
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
  },
  comparecards: (gameid, player, otherval, callback)=>{
    knex(`goofspeilp${player}hands`).select('staging')
    .where('gameid', gameid)
    .asCallback((err, rows)=>{
      callback(parseInt(rows[0].staging))
    })
  },
  goofwin: (gameid, winner, loser, cb)=>{
    knex(`goofspeilp${winner}hands`)
    .where({gameid: gameid})
    .update({staging: null})
    .asCallback(()=>{
      knex(`goofspeilp${loser}hands`)
      .where({gameid: gameid})
      .update({staging: null})
      .asCallback(()=>{
        knex(`goofspeildeck`)
        .where({gameid: gameid})
        .select('staging')
        .asCallback((err, rows)=>{
          knex(`goofspeilp${winner}hands`)
          .where({gameid: gameid})
          .increment('score', parseInt(rows[0].staging, 10))
          .asCallback(()=>{
            cb()
          })
        })
        // knex(`goofspeilp${winner}hands`)
        // .where({gameid: gameid})
        // .increment('score', 10)
        // .asCallback(()=>{
        //           cb()
        // })

      })
    })
  }
};
