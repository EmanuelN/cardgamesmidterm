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

knex('goofspeils').returning('id')
    .insert({player1_id: 1})
    .asCallback((err, id)=>{
      console.log(id)
      return knex.destroy()
    })