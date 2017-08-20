const express = require('express');
const app = express();


const cookieParser = require('cookie-session');

app.use(cookieParser({
  name: 'session',
  keys: ['gdionasgionads', 'gnuiadngiudndn'],
}));

const sass  = require("node-sass-middleware");
app.use("/styles", sass({
  src: __dirname + '/../styles',
  dest: __dirname + '/../public/styles',
  debug: true,
  outputStyle: 'expanded'
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
              userID: req.session.user_id,

            });
      });
    })
 });
});

app.get('/goofspeil/:id/:player/', (req, res)=>{
  knexhelper.goofspeilobject(req.params.id, req.params.player, (obj)=>{
        res.render('goofspeil',
      {
        user: obj,
        gameid: req.params.id,
        playerid: req.params.player,
        name: 'Emanuel'
    });
  })
})
let cardsplayed = 0;
app.post('/goofspeil/:gameid/:playerid/:cardid', (req, res)=>{
  knexhelper.goofspeilplaycard(req.params.gameid, req.params.playerid, req.params.cardid,
    function(){
      console.log('player ', req.params.playerid, ' played ', req.params.cardid);
      cardsplayed ++;
      if (cardsplayed === 2){
        cardsplayed = 0;
        knexhelper.comparecards(req.params.gameid, 1, "", function(staging1){
          knexhelper.comparecards(req.params.gameid, 2, staging1, function(staging2){
            if(staging1 > staging2){
              knexhelper.goofwin(req.params.gameid, 1, 2, function(){
                console.log('player 1 won')
              })
            } else if (staging2 > staging1){
                 knexhelper.goofwin(req.params.gameid, 2, 1, function(){
                console.log('player 2 won')
              })
            } else {
              console.log('nobody wins')
            }

          })
        })
      }
      res.redirect(`/goofspeil/${req.params.gameid}/${req.params.playerid}`);
    })
});

app.get('/:game/matchmaking/', (req,res)=>{
  knexhelper.matchmaking(req.params.game, 2, function(id){
    res.end(id)
  })
});

app.post('/:game/newgame/', (req,res)=>{
  knexhelper.creatematch(req.params.game, 1, function(id){
    res.end(id)
  })
});

app.post('/goofspeil/:gameid/win/:finalpts/:winner', (req, res) =>{
   knexhelper.addpt(function(){
       res.redirect('/');
   }, req.params.pl1, req.params.pl2, req.params.win, "goofspeils");

});

app.post('/blackjack/:pl1/:pl2/:win', (req, res) =>{
   knexhelper.addpt(function(){
       res.redirect('/');
   }, req.params.pl1, req.params.pl2, req.params.win, "blackjacks");

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
      {
        user: gameState,
        name: myName.name
    })
  }
});
})

//dummy data used to render goofspeil
let gameState = {
  prize: {
    suit: 'diamonds',
    cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

  },
  p1: {
    score: 0,
    suit: 'spades',
    cards: ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    stage: ''
  },
  p2: {
    score: 0,
    suit: 'hearts',
    cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    stage: ''
  }
}


app.listen(8080, ()=>{
  console.log('Listening on port 8080...');
});
