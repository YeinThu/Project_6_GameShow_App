// DOM Elements & Variables
const phrase = document.querySelector('#phrase');
const qwerty = document.querySelector('#qwerty');
const startGameBtn = document.querySelector('.btn__reset');
const phrases = [
  'up up and away',
  // 'tuning in',
  // 'feel the beat',
  // 'day and night',
  // 'shine bright'
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

  if (lis) {
    for (let i = 0; i < lis.length; i++) {
      const current = lis[i];

      if (current.textContent === button.textContent) {
        current.classList += ' show';
        button.setAttribute('disabled', 'true');
        button.className = 'chosen';
      }
      else {
        
      }
    }
  }

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

// Listen For OnScreen Keyboard Click
qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    // Get Letter User Clicked On
    const userValue = e.target;
    // Call Check Letter
    checkLetter(userValue);
    
  }
})

