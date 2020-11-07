// DOM Elements & Variables
const phrase = document.querySelector('#phrase');
const qwerty = document.querySelector('#qwerty');
const startGameBtn = document.querySelector('.btn__reset');
const phrases = [
  'up up and away',
  'tuning in',
  'feel the beat',
  'day and night',
  'shine bright'
];
let missedGuesses = 0;

// Get Random Phrase From Array
const getRandomPhrase = arr => {
  const randomNum = Math.floor(Math.random() * phrases.length);
  const randomPhrase = phrases[randomNum];

  return randomPhrase;
}

// Add Letters Of Phrase To Display
const addPhraseToDisplay = (phr) => {
  const phrArr = phr.split('');
  const ul = phrase.querySelector('ul');
  let html = '';

  phrArr.forEach(char => {
    if (char === ' ') { 
      html += `<li class="space"></li>`
    } else {
      html += `<li class="letter">${char}</li>`;
    }
    
  });

  ul.innerHTML = html;
}

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
}

// Check If Game Has Been Won / Lost
const checkWin = () => {
  const letterLis = phrase.querySelectorAll('ul .letter');
  const showLis = phrase.querySelectorAll('ul .show');
  const overlay = document.querySelector('#overlay');

  if (letterLis.length === showLis.length) {
    overlay.className = 'win';
    startGameBtn.textContent = 'Play Again';
    overlay.querySelector('.message').textContent = 'You\'ve Won!';
    overlay.style.display = 'flex';
  } 
  else if (missedGuesses > 4) {
    overlay.className = 'lose';
    startGameBtn.textContent = 'Play Again';
    overlay.querySelector('.message').textContent = 'You\'ve Lost...';
    overlay.style.display = 'flex';
  }

  startGameBtn.addEventListener('click', resetGame);
}

// Listen For Start Game Button Click
startGameBtn.addEventListener('click', () => {
  // Hide Overlay
  const overlay = document.querySelector('#overlay');
  overlay.style.display = 'none';

  // Display Phrase
  const phr = getRandomPhrase(phrases);
  addPhraseToDisplay(phr);

});

// Reset Game
const resetGame = () => {
  // Set Missed Guess To 0
  missedGuesses = 0;

  // Fill Live Hearts
  let liveHearts = document.querySelectorAll('.tries img');
  for (let i = 0; i < liveHearts.length; i++) {
    liveHearts[i].src = 'images/liveHeart.png';
  }

  // Refresh Keyboard
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
}

// Listen For OnScreen Keyboard Click
qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    // Get Letter User Clicked On
    const userValue = e.target;

    // Add Class & Disabled To Button
    userValue.classList += ' chosen';
    userValue.setAttribute('disabled', 'true');

    // Call Check Letter
    if (!checkLetter(userValue)) {
      userValue.style.backgroundColor = 'orange';
      missedGuesses++;

      // Subtract Heart
      let liveHearts = document.querySelectorAll('.tries img');
      liveHearts[`${missedGuesses - 1}`].src = 'images/lostHeart.png';
    }
  }

  checkWin();
})

