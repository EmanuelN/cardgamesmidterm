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
const knexhelper = require('../modules/knexhelper.js');


//ROUTES
app.get("/", (req,res) =>{
  let rankingGoofspeil = {};
  let myName = ""
  let rankingBlackjack = {};
  knexhelper.goofspeil(function(err, rows){
    for (let row in rows){
      rankingGoofspeil[row] = {
        player: rows[row].player,
        wins: rows[row].wins
      };
    }
    knexhelper.name(function(err, name){
      myName = name;
      knexhelper.blackjack((err, rows)=>{
        for (let row in rows){
          rankingBlackjack[row] = {
            player: rows[row].player,
            wins: rows[row].wins
          };
        }
        res.render('home',
            {name: myName.name,
              rankingBlackjack: rankingBlackjack,
              rankingGoofspeil: rankingGoofspeil,
              userID: req.session.user_id
            });
      });
    })
 });
});

app.post('/goofspeil/:pl1/:pl2/:win', (req, res) =>{
   knexhelper.addpt(function(){
       res.redirect('/');
   }, req.params.pl1, req.params.pl2, req.params.win);

});

app.post('/logout', (req, res) =>{
  req.session.user_id = null;
  res.redirect('/');
})

app.post('/login', (req, res) =>{
  req.session.user_id = '1';
  res.redirect('/');
});

//when user clicks on goofspeil
app.get('/goofspeil', (req, res) =>{
  knexhelper.name(function(err, name){
      myName = name;
  if (!req.session.user_id){
    res.redirect('/');
  } else {
    res.render('goofspeil',
      {name: myName.name
    });
  }
});
})


app.listen(8080, ()=>{
  console.log('Listening on port 8080...');
});
