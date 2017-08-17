house = {
  score: [],
  cards: []
}

p1 = {
  score: [],
  cards: []
}

p2 = {
  score: [],
  cards: []
}

suits = ['hearts', 'spades', 'clubs', 'diamonds']
cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

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
  'J': 10,
  'Q': 10,
  'K': 10
};

function calcCard(card) {
  card = translateTable[card] || card;
  return card
}
//should you push in card or value here?
function generateNewCardValue(someObject) {
  value = cards[Math.floor(Math.random() * 13)]
  suit = suits[Math.floor(Math.random() * 4)]
  someObject.cards.push(suit)
  someObject.score.push(value)
  return someObject
}

function houseScore(houseObject) {
  while (houseObject.score < 17) {
    generateNewCardValue(houseObject)
  }
  return houseObject
}

//has to be an event here for "hit"
function userScores(playerObject) {
  generateNewCardValue(playerObject)
  return playerObject
}
