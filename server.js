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

app.get("/", (req,res) =>{
  if (req.session.user_id){
    res.redirect('home.html');
  } else{
    res.redirect('login.html');
  }
});

app.get('/login', (req, res) =>{
  if (!req.session.user_id){
    res.redirect('login.html');
  } else {
    res.redirect('home.html');
  }
})

app.post('/logout', (req, res) =>{
  req.session.user_id = null;
  res.redirect('login.html');
})

app.post('/login', (req, res) =>{
  req.session.user_id = req.body.email;
  res.redirect('home.html');
});

app.listen(8080, ()=>{
  console.log('Listening on port 8080...');
});
