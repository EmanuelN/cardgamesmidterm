// GET /game/state

// POST /game/play-card

gameState = {
  prize: {
    suit: '',
    cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  },
  //score is never updated
  p1: {
    score: 0,
    suit: '',
    cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  },
  //score is never updated
  p2: {
    score: 0,
    suit: '',
    cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  }
}

suits = ['hearts', 'spades', 'clubs', 'diamonds']
//got the suit and the cards for the prize
gameState.prize.suit = suits[Math.floor(Math.random() * 4)]//change to object
var prizeIndex = suits.indexOf(gameState.prize.suit)
gameState.prize.suit = suits.splice(prizeIndex, 1)

//got the suit and the cards for the first player
gameState.p1.suit = suits[Math.floor(Math.random()*3)]//change to object
var p1Index = suits.indexOf(gameState.p1.suit)
gameState.p1.suit = suits.splice(p1Index, 1)

//got the suit and the cards for the second player
gameState.p2.suit = suits[Math.floor(Math.random()*2)]//change to object
var p2Index = suits.indexOf(gameState.p2.suit)
gameState.p2.suit = suits.splice(p2Index, 1)


//Card on the floor or the "prize card"
function cardFromDeck() {
  //the number of cards you start with are 13
  var rand = gameState.prize.cards[Math.floor(Math.random()*gameState.prize.cards.length)]//change to object
  upturnedCard = gameState.prize.cards.splice(gameState.prize.cards.indexOf(rand), 1)//change to object
  return upturnedCard
}

var upturnedCard = cardFromDeck();

//prompt that asks what card player 1 is planning on playing
//takes in command line arguments for player 1's card
let player1card = process.argv[2]
function player1Play(player1card) {
  console.log("Player 1, what card would you like to play?")
  console.log(`The cards you are able to play are: `)
  console.log(`${gameState.p1.cards}`)//change to object
  console.log(`You decided to play ${player1card}`)
}
//prompt that asks what card player 2 is planning on playing
//takes in command line arguments for player 2's card
let player2card = process.argv[3]
function player2Play(player2card) {
  console.log("Player 2, what card would you like to play?")
  console.log(`The cards you are able to play are: `)
  console.log(`${gameState.p2.cards}`)//change to object
  console.log(`You decided to play ${player2card}`)
}


//Do i want to replace all my face cards with number cards here or on the front end?
//translatetable and calcCard are both used to change the value of a face card
//to use for calculation
var translateTable = {
  'A': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13
};

function calcCard(card) {
  card = translateTable[card] || card;
  return card
}

//function responsible for updating the players score
//value added to the score is the upturnedCard
function playCard(player1card, player2card, upturnedCard) {
  console.log(`The prize card being played is: ${upturnedCard}`)
  //pass in calcCard
  if (calcCard(player1card) > calcCard(player2card)) {
    console.log("player 1 won")
    gameState.p1.score += calcCard(upturnedCard)//change to refeence objct
  } else if (calcCard(player1card) < calcCard(player2card)){
    console.log("player 2 won")
    gameState.p2.score += calcCard(upturnedCard)//change to reference object
  }
  playedcardIndex1 = gameState.p1.cards.indexOf(player1card)//change to reference object
  removedCard1 = gameState.p1.cards.splice(playedcardIndex1, 1)
  playedcardIndex2 = gameState.p2.cards.indexOf(player2card)
  removedCard2 = gameState.p2.cards.splice(playedcardIndex2, 1)//change to reference object

  console.log(gameState.p1.score)//chang to reference score
  console.log(gameState.p2.score)//change to reference score
}

function playGame() {
  while (gameState.prize.cards.length > 0) {//change to reference object

    cardFromDeck()
    player1Play(player1card)
    player2Play(player2card)
    playCard(player1card, player2card, upturnedCard)
    break;
  }
}


playGame()
