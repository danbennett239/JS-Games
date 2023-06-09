document.addEventListener('DOMContentLoaded', () => {
  // Different cards
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
  ]
  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const turnsTakenDisplay = document.querySelector('#turns');
  var turnsTaken = 0;
  var cardsChosen = [];
  var cardsChosenID = [];
  const cardsWon = [];

  // Create board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img');
      card.setAttribute('src', 'images/blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  // Flip card
  function flipCard() {
    var cardID = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardID].name);
    cardsChosenID.push(cardID);
    this.setAttribute('src', cardArray[cardID].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500); 
    }
  }

  // Check for match
  function checkForMatch() {
    turnsTaken = turnsTaken + 1;
    turnsTakenDisplay.textContent = turnsTaken;
    var cards = document.querySelectorAll('img');
    const optionOneID = cardsChosenID[0];
    const optionTwoID = cardsChosenID[1];
    
    if(optionOneID == optionTwoID) {
      cards[optionOneID].setAttribute('src', 'images/blank.png');
      cards[optionTwoID].setAttribute('src', 'images/blank.png');
      alert('You have clicked the same image!');
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match');
      cards[optionOneID].setAttribute('src', 'images/white.png');
      cards[optionTwoID].setAttribute('src', 'images/white.png');
      cards[optionOneID].removeEventListener('click', flipCard);
      cards[optionTwoID].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneID].setAttribute('src', 'images/blank.png');
      cards[optionTwoID].setAttribute('src', 'images/blank.png');
      alert('Sorry, try again');
    }
    cardsChosen = [];
    cardsChosenID = [];
    resultDisplay.textContent = cardsWon.length;
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!';
    }
  }
  createBoard();
})


