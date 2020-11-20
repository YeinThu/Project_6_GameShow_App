// Variables & DOM Elements
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const buttonStart = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phrases = [
  'up up and away',
  'tuning in',
  'feel the beat',
  'day and night',
  'shine bright'
];
let missedGuesses = 0;
let gameState = null;

// // ------------------------------ Data Functions ------------------------------ >
// Get Random Phrase From Array
const getRandomPhrase = (arr) => {
  const randomNum = Math.floor(Math.random() * phrases.length);
  const randomPhrase = phrases[randomNum];

  return randomPhrase;
};

// Check For Letter In Phrase
const checkLetter = (button) => {
  const lis = phrase.querySelector('ul').children;

  let match = null;

  for (let i = 0; i < lis.length; i++) {
    const current = lis[i];

    if (current.textContent === button.textContent) {
      current.classList += ' show wiggle';
      match = true;
    }
  }

  return match;
};

// Check For Win or Lose
const checkWin = () => {
  const letterLis = phrase.querySelectorAll('ul .letter');
  const showLis = phrase.querySelectorAll('ul .show');
  let result = '';

  if (letterLis.length === showLis.length) {
    result = 'win';
  }
  else if (missedGuesses >= 5) {
    result = 'lose';
  }

  return result;
};

// Game Reset
const gameReset = () => {
  // Set Missed Guesses To 0
  missedGuesses = 0;

  // Fill Live Hearts
  let liveHearts = document.querySelectorAll('.tries img');
  for (let i = 0; i < liveHearts.length; i++) {
    liveHearts[i].src = 'images/liveHeart.png';
  }

  qwerty.innerHTML = `
  <div class="keyrow">
    <button>q</button><button>w</button><button>e</button><button>r</button><button>t</button><button>y</button><button>u</button><button>i</button><button>o</button><button>p</button>
  </div>
  <div class="keyrow">
    <button>a</button><button>s</button><button>d</button><button>f</button><button>g</button><button>h</button><button>j</button><button>k</button><button>l</button>
  </div>
  <div class="keyrow">
    <button>z</button><button>x</button><button>c</button><button>v</button><button>b</button><button>n</button><button>m</button>
  </div>
  `;
};

// ------------------------------ UI Functions ------------------------------ >

// UI Functions
// Overlay Display Depending On State Of Game
const overlayDisplay = (gameState) => {

  if (gameState === 'win') {
    overlay.className = 'win';
    overlay.querySelector('.btn__reset').textContent = 'Play Again';
    overlay.style.display = 'flex';
    document.querySelector('.result').textContent = `You Win!`;
    gameReset();
  }
  else if (gameState === 'lose') {
    overlay.className = 'lose';
    overlay.querySelector('.btn__reset').textContent = 'Play Again';
    overlay.style.display = 'flex';
    document.querySelector('.result').textContent = `You Lose!`;
    gameReset();
  }

}

// Add Phrase To Display On Board
const addPhraseToDisplay = (newPhrase) => {
  newPhrase = newPhrase.split('');
  const ul = phrase.querySelector('ul');
  let html = '';
  
  newPhrase.forEach((char) => {
    if (char === ' ') {
      html+= `<li class="space"></li>`;
    }
    else {
      html+= `<li class="letter">${char}</li>`;
    }
  });

  ul.innerHTML = html;
};

// ------------------------------ Event Listeners ------------------------------ >
// Start Game
overlay.addEventListener('click', (e) => {
  const target = e.target;

  if (target === buttonStart) {
    // Hide Overlay
    overlay.style.display = 'none';
    // Get Random Phrase
    const randomPhrase = getRandomPhrase(phrases);
    // Display Random Phrase
    addPhraseToDisplay(randomPhrase);
  }
})

// Letter Guess
qwerty.addEventListener('click', (e) => {
  const target = e.target;

  if (target.tagName === 'BUTTON') {
    // Add Class & Disabled To Button
    target.classList += ' chosen';
    target.setAttribute('disabled', 'true');

    // Call Check Letter
    if (!checkLetter(target)) {
      target.style.backgroundColor = 'orange';
      missedGuesses++;

      // Subtract Heart
      let liveHearts = document.querySelectorAll('.tries img');
      liveHearts[`${missedGuesses - 1}`].src = 'images/lostHeart.png';
    };
  }

  // Get Result
  const result = checkWin();
  
  overlayDisplay(result);
  
})



