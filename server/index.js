const express = require('express');
const app = express();


const cookieParser = require('cookie-session');

app.use(cookieParser({
  name: 'session',
  keys: ['gdionasgionads', 'gnuiadngiudndn'],
}));


const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

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
let name = ""
knex.select('name').from('users').where({id: 1})
  .asCallback((err, rows) => {
    if (err){
    console.error(err)
  } else{
    name = rows[0].name;
  }
    return knex.destroy();
});

//ROUTES
app.get("/", (req,res) =>{
  if (req.session.user_id){
    res.render('home',
      {name: name
    });
  } else{
    res.render('login');
  }
});

app.get('/login', (req, res) =>{
  if (!req.session.user_id){
    res.render('login');
  } else {
    res.redirect('/');
  }
})

app.post('/logout', (req, res) =>{
  req.session.user_id = null;
  res.render('login');
})

app.post('/login', (req, res) =>{
  req.session.user_id = '1';
  res.redirect('/');
});

//when user clicks on goofspeil
app.get('/goofspeil', (req, res) =>{
  if (!req.session.user_id){
    res.render('login');
  } else {
    res.render('goofspeil',
      {name: name
    });
  }
})


app.listen(8080, ()=>{
  console.log('Listening on port 8080...');
});
