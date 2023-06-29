let wordArray = [];
const dashContainer = document.getElementById('word');
let health = 0;

window.onload = generateWord;

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
   let foundMatch = false;
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === inputChar) {
      foundMatch = true;
      alterDiv(i, inputChar);
    }
  }
  if (!foundMatch) {
    if (health !== 0) {
      health = health - 1;
      displayHealth(health);
    } else {
      alert('Game over');
    }
    
  }
}

// Change dash to letter
function alterDiv(charIndex, char) {
  const divId = 'div' + charIndex;
  const divElement = document.getElementById(divId);
  if (divElement) {
    divElement.textContent = char;
  }
}




