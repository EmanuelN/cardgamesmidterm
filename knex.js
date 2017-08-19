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

function changeval(game, player, card){
  knex(`goofspeilp${[player]}hands`)
  .where({gameid: game})
  .update({[card]: false})
  .asCallback((err, rows)=>{
    if(err){
      console.error(err);
    }
    return knex.destroy();
  })
}

changeval(1, 2, 2);