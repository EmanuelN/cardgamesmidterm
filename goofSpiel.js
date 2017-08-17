gameState = {
  prize: {
    suit: '',
    cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

  },
  p1: {
    score: 0,
    suit: '',
    cards: ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    stage: ''
  },
  p2: {
    score: 0,
    suit: '',
    cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    stage: ''
  }
}

//This portion of the funcion only needs to be run once,
//updates the gameState add in the suit of the prize deck,
//and both player 1 and player 2
suits = ['hearts', 'spades', 'clubs', 'diamonds']
gameState.prize.suit = suits[Math.floor(Math.random() * 4)]
var prizeIndex = suits.indexOf(gameState.prize.suit)
gameState.prize.suit = suits.splice(prizeIndex, 1)

gameState.p1.suit = suits[Math.floor(Math.random()*3)]
var p1Index = suits.indexOf(gameState.p1.suit)
gameState.p1.suit = suits.splice(p1Index, 1)

gameState.p2.suit = suits[Math.floor(Math.random()*2)]
var p2Index = suits.indexOf(gameState.p2.suit)
gameState.p2.suit = suits.splice(p2Index, 1)


//Translatetable and calcCard are both used to change the value of a card
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

//Card on the floor or the "prize card"
//everytime this function is called, a new card is upturned
//and removed from the gameState.prize cards array
function cardFromDeck() {
  var rand = gameState.prize.cards[Math.floor(Math.random()*gameState.prize.cards.length)]
  upturnedCard = gameState.prize.cards.splice(gameState.prize.cards.indexOf(rand), 1)
  console.log(`The prize card is ${upturnedCard}`)
  return upturnedCard
}

var upturnedCard = cardFromDeck()

//called when a player is going to play a card
function playCard(gameObject, cardPlayed, userID) {
  console.log(`You played ${cardPlayed}`)
  playedcardIndex = gameObject[userID].cards.indexOf(cardPlayed)
  removedCard = gameObject[userID].cards.splice(playedcardIndex, 1)
  gameObject[userID].stage = removedCard
  return cardPlayed
}

//function responsible for updating the players score
//value added to the score is the upturnedCard
function scoring(card1, card2, upturnedCard){
  var player1Card = card1
  var player2Card = card2
  var scoringCard = upturnedCard
  if (calcCard(player1Card) > calcCard(player2Card)) {
    gameState.p1.score += calcCard(scoringCard)
  } else if (calcCard(player2Card) > calcCard(player1Card)) {
    gameState.p2.score += calcCard(scoringCard)
  }
  return gameState
}

console.log(scoring(playCard(gameState, 'K', 'p1'), playCard(gameState, 'A', 'p2'), upturnedCard))
