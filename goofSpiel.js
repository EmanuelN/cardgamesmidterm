prize = {
  suit: '',
  cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
}

p1 = {
  score: 0,
  suit: '',
  cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
}

p2 = {
  score: 0,
  suit: '',
  cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
}

suits = ['hearts', 'spades', 'clubs', 'diamonds']
//got the suit and the cards for the prize
prize.suit = suits[Math.floor(Math.random() * 4)]
var prizeIndex = suits.indexOf(prize)
suits.splice(prizeIndex, 1)

//got the suit and the cards for the first player
p1.suit = suits[Math.floor(Math.random()*3)]
var p1Index = suits.indexOf(prize)
suits.splice(p1Index, 1)

//got the suit and the cards for the second player
p2.suit = suits[Math.floor(Math.random()*2)]
var p2Index = suits.indexOf(prize)
suits.splice(p2Index, 1)

//Card on the floor or the "prize card"
function cardFromDeck() {
  //the number of cards you start with are 13
  var rand = prize.cards[Math.floor(Math.random()*prize.cards.length)]
  upturnedCard = prize.cards.splice(prize.cards.indexOf(rand), 1)
  return upturnedCard
}

var upturnedCard = cardFromDeck();

//prompt that asks what card player 1 is planning on playing
//takes in command line arguments for player 1's card
let player1card = process.argv[2]
function player1Play(player1card) {
  console.log("Player 1, what card would you like to play?")
  console.log(`The cards you are able to play are: `)
  console.log(`${p1.cards}`)
  console.log(`You decided to play ${player1card}`)
}
//prompt that asks what card player 2 is planning on playing
//takes in command line arguments for player 2's card
let player2card = process.argv[3]
function player2Play(player2card) {
  console.log("Player 2, what card would you like to play?")
  console.log(`The cards you are able to play are: `)
  console.log(`${p1.cards}`)
  console.log(`You decided to play ${player2card}`)
}
//variables that hold the current score of the player
var player1Score = 0
var player2Score = 0

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
  //pass in calcCard
  if (calcCard(player1card) > calcCard(player2card)) {
    console.log("player 1 won")
    player1Score += calcCard(upturnedCard)
  } else if (calcCard(player1card) < calcCard(player2card)){
    console.log("player 2 won")
    player2Score += calcCard(upturnedCard)
  }
  playedcardIndex1 = p1.cards.indexOf(player1card)
  removedCard1 = p1.cards.splice(playedcardIndex1, 1)
  playedcardIndex2 = p2.cards.indexOf(player2card)
  removedCard2 = p2.cards.splice(playedcardIndex2, 1)
  console.log(`The card being played is: ${upturnedCard}`)
  console.log(player1Score)
  console.log(player2Score)
}

function playGame() {
  while (prize.cards.length > 0) {
    var p1choice = Math.floor(Math.random() * 13)
    cardFromDeck()
    player1Play(p1choice)
    player2Play(8)
    playCard(player1card, player2card, upturnedCard)
    break;
  }
}

playGame()
