let wordArray = [];
let pressedLetters = []; // Array to track pressed letter
const dashContainer = document.getElementById('word');
let health = 0;

window.onload = generateWord;
// window.onload = offlineWord;

// Offline word
function offlineWord() {
  const word = 'Bacteria';
  health = word.length + 5;
  displayHealth(health);
  stringToCharArray(word);
}

// Taking keyboard input
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('click', () => {
    const letter = key.textContent;
    containsChar(letter);
    // Changing keyboard color 
    key.classList.add('button-pressed');
  });
});

// Calls random word API
function generateWord() {
  const loadingContainer = document.getElementById('loading-container');
  const wordContainer = document.getElementById('word-container');
  loadingContainer.style.display = 'block'; // Show loading container
  wordContainer.style.display = 'none'; // Hide word container
  const apiKey = 'xufwrwrHjLBDSn4sM1NhVA==umjoIS4j5W2s84id';
  fetch('https://api.api-ninjas.com/v1/randomword', {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      const word = data.word.toUpperCase();
      console.log(word);
      health = word.length + 5;
      displayHealth(health);
      stringToCharArray(word);
      loadingContainer.style.display = 'none'; // Hide loading container
      wordContainer.style.display = 'block'; // Show word container
    })
    .catch(error => {
      console.error('Error', error);
    });
}

// Function that displays health
function displayHealth(health) {
  const healthContainer = document.getElementById('health-container');
  healthContainer.textContent = `Health: ${health}`;
}

// Function that converts string into char array
function stringToCharArray(str) {
  wordArray = Array.from(str);
  createDashElements(Array.from(str));
}

// Creates '-' elemtents in the HTML
function createDashElements(charArray) {
  const length = charArray.length;
  for (let i = 0; i < length; i++) {
    const div = document.createElement('div');
    div.textContent = '-';
    div.id = 'div' + i;
    dashContainer.appendChild(div);
  }
}

// Check if the inputed char is in the word
function containsChar(inputChar) {
   // Check if the letter has already been pressed
  if (pressedLetters.includes(inputChar)) {
    return; // Do nothing if the letter has already been pressed
  }

  let foundMatch = false;
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === inputChar) {
      foundMatch = true;
      alterDiv(i, inputChar);
    }
  }
  if (!foundMatch) {
    if (health > 0) {
      health = health - 1;
      displayHealth(health);
      if (health === 0) {
        dashContainer.classList.add('loss');
        revealFullWord();
        setTimeout(newGame, 1250);
      }
    }
  } else {
    if (checkAllLettersRevealed()) {
      dashContainer.classList.add('win')
      setTimeout(newGame, 1250); // Start a new game
    }

  }
  pressedLetters.push(inputChar); // Add the pressed letter to the array
}

// Change dash to letter
function alterDiv(charIndex, char) {
  const divId = 'div' + charIndex;
  const divElement = document.getElementById(divId);
  if (divElement) {
    divElement.textContent = char;
  }
}

// New game 
const newGameBTN = document.getElementById('button-NG');
newGameBTN.addEventListener('click', () => {
  newGame();
});

// Starts new game
function newGame() {
  dashContainer.textContent = '';
  dashContainer.classList.remove('win');
  dashContainer.classList.remove('loss');
  clearKeyboard();
  generateWord();
}

// Clear keyboard on new game
function clearKeyboard() {
  keys.forEach(key => {
    key.classList.remove('button-pressed');
  });
}

// Hint 
const hintButton = document.getElementById('button-H');
hintButton.addEventListener('click', () => {
  revealHint();
});

// Function to reveal a hint
function revealHint() {
  let hiddenIndices = [];

  // Find indicies of hidden letters 
  for (let i = 0; i < wordArray.length; i++) {
    const divId = 'div' + i;
    const divElement = document.getElementById(divId);
    if (divElement.textContent === '-') {
      hiddenIndices.push(i);
    }
  }

  // Check if there are hidden letters
  if (hiddenIndices.length > 0) {
    // Select a random hidden index
    const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];

    // Reveal the letter at the random index
    alterDiv(randomIndex, wordArray[randomIndex]);

    // Find the key element corresponding to the revealed letter
    const hintLetter = wordArray[randomIndex];
    keys.forEach(key => {
      const keyboardLetter = key.textContent;
      if (hintLetter === keyboardLetter) {
        key.classList.add('button-pressed');
      } 
    });

     // Check if all letters are revealed
    if (checkAllLettersRevealed()) {
      dashContainer.classList.add('win')
      setTimeout(newGame, 1250); // Start a new game
    }
  }
}

// Check if win
function checkAllLettersRevealed() {
  const divElements = dashContainer.querySelectorAll('div');
  for (const div of divElements) {
    if (div.textContent === '-') {
      return false;
    }
  }
  return true;
}

// Reveals the full word
function revealFullWord() {
  for (let i = 0; i < wordArray.length; i++) {
    alterDiv(i, wordArray[i]);
  }
}
  

