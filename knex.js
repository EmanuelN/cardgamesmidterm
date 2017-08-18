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
let obj = {}
function p1hand(callback) {
  knex('goofspeilp1hands').select('*').where('gameid', 1)
  .asCallback((err, rows)=>{
    let array = [];
    for (let row in rows[0]){
      if(rows[0][row] === true){
        array.push(row);
      }
    }
    obj.player1hand = array;
    obj.player1score = rows[0].score;
    obj.player1stage = rows[0].staging;
    callback()
  })
}

function deck(cb, cb2){
  knex('goofspeildeck').select('*').where('gameid', 1)
  .asCallback((err, rows)=>{
    let array = [];
    for (let row in rows[0]){
      if(rows[0][row] === true){
        array.push(row);
      }
    }
    obj.deck = array;
    cb(cb2)
  })
}
function p2hand(){
  knex('goofspeilp2hands').select('*').where('gameid', 1)
  .asCallback((err, rows)=>{
    let array = [];
    for (let row in rows[0]){
      if(rows[0][row] === true){
        array.push(row);
      }
    }
    obj.player2hand = array;
    obj.player2score = rows[0].score;
    obj.player2stage = rows[0].staging;
    console.log(obj)
    return knex.destroy();

  })
}
deck(p1hand, p2hand)