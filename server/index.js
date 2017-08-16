const express = require('express');
const app = express();

const cookieParser = require('cookie-session');

app.use(cookieParser({
  name: 'session',
  keys: ['gdionasgionads', 'gnuiadngiudndn'],
}));


const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


//ROUTES
app.get("/", (req,res) =>{
  if (req.session.user_id){
    let name = req.session.user_id
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
  req.session.user_id = req.body.email;
  res.redirect('/');
});

app.listen(8080, ()=>{
  console.log('Listening on port 8080...');
});
