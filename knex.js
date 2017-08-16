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

knex.select('name').from('users').where({id: 1})
  .asCallback((err, rows) => {
    if (err){
    console.error(err)
  } else{
    console.log(rows[0].name)
  }
    return knex.destroy();
});
