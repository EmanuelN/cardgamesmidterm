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

const subquery = knex.select('winner_id').from('goofspeils');

function test(testid) {
  knex('users').select('id')
  .whereIn('id', subquery)
  .asCallback((err, rows)=>{
      console.log(testid)
      console.log(rows)
      for (let row in rows){
      if (rows[row].id == testid){
        console.log('true')
        return knex.destroy()
      }
    }
      console.log('false')
    return knex.destroy()
  });
}