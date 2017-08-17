require('dotenv').config();

console.log('Adding....');

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
knex.insert({player1_id: 2, player2_id: 3, winner_id: 2})
.into('goofspeils')
.then(() => {
  knex.select('*').from('goofspeils')
  .asCallback((err, rows)=>{
    return knex.destroy();
  });
})

