//figure out how to score ace
//ace = 11, is you're over then subtract 10 from the total 

gameState = {
  house : {
    score: 0,
    cards: []
  },
  p1 : {
    score: 0,
    cards: ['']
  },
  p2 : {
    score: 0,
    cards: ['']
  }
}

suits = ['hearts', 'spades', 'clubs', 'diamonds']
cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']


//if the total score is over 21 and you have an ace, subtract 10
var translateTable = {
  'A': 11,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10,
  'K': 10
};

function calcCard(card) {
  card = translateTable[card] || card;
  return card
}

function score(player) {
  total = 0
  for (i = 0; i < gameState[player].score.length; i++) {
    total += gameState[player].score[i]
  }
  return total
}

//everytime user clicks on "hit", generateNewCardValue will be called
//card needs to be changed into either an array of arrays
// or object of arrays or object of object
function generateNewCardValue(someObject, player) {
  value = cards[Math.floor(Math.random() * 13)]
  suit = suits[Math.floor(Math.random() * 4)]
  card = `${value} of ${suit}`
  someObject[player].cards.push(card)
  someObject[player].score += calcCard(value)
  return someObject
}

//game will automatcally return the house score
function houseScore(houseObject) {
  while (houseObject.house.score < 17) {
    generateNewCardValue(houseObject, 'house')
  }
  return houseObject
}

console.log(houseScore(gameState))
