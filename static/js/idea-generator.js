const API_BASE = '/api';

const generateBtn = document.getElementById('generateBtn');
const ideaContainer = document.getElementById('ideaContainer');
const ideaText = document.getElementById('ideaText');
const ideaId = document.getElementById('ideaId');
const acceptIdeaBtn = document.getElementById('acceptIdeaBtn');
const confirmPopup = document.getElementById('confirmPopup');
const confirmContinue = document.getElementById('confirmContinue');
const confirmBack = document.getElementById('confirmBack');
const ideaDisclaimer = document.getElementById('ideaDisclaimer');
const localIdeas = {
  '1': { text: 'Beat a short, 10-second platformer level to grab a virtual key.', id: '1' },
  '2': { text: 'Hit notes in time with a song, like Guitar Hero, to unlock access.', id: '2' },
  '3': { text: 'Type a paragraph with a minimum WPM and accuracy.', id: '3' },
  '4': { text: 'Find a tiny character or object in a complex image.', id: '4' },
  '5': { text: 'Identify a random location on Google Maps Street View.', id: '5' },
  '6': { text: 'Solve a "mate in one" chess puzzle.', id: '6' },
  '7': { text: 'Get a score in a simple game like Flappy Bird.', id: '7' },
  '8': { text: 'Repeat a sequence of colours and sounds.', id: '8' },
  '9': { text: 'Get a ball into a basket by drawing lines.', id: '9' },
  '10': { text: 'Navigate a dot through a maze before the timer runs out.', id: '10' },
  '11': { text: 'Solve a five-letter word puzzle that changes daily.', id: '11' },
  '12': { text: 'Click a button the instant it changes colour.', id: '12' },
  '13': { text: 'Match musical notes with your voice.', id: '13' },
  '14': { text: 'Find a combo by listening to tumbler clicks.', id: '14' },
  '15': { text: "Find the 'key' item in a short text adventure.", id: '15' },
  '16': { text: 'Mix a specific drink from virtual ingredients.', id: '16' },
  '17': { text: "Only allowed if you've made a commit today.", id: '17' },
  '18': { text: 'Use your most-played artist of the week.', id: '18' },
  '19': { text: 'Allowed only if your streak is active.', id: '19' },
  '20': { text: 'Use the current price of a cryptocurrency.', id: '20' },
  '21': { text: 'Only works if your local weather matches a condition.', id: '21' },
  '22': { text: 'Use the distance from your last run or ride.', id: '22' },
  '23': { text: 'Log in only if your rep is above a prime number.', id: '23' },
  '24': { text: 'Use the current ISS latitude and longitude.', id: '24' },
  '25': { text: 'Use the third word of today’s top BBC headline.', id: '25' },
  '26': { text: 'Login button activates if a specific stock is up.', id: '26' },
  '27': { text: 'Use the latest version of an npm package.', id: '27' },
  '28': { text: 'Your latest tweet must include a specific hashtag.', id: '28' },
  '29': { text: 'You need a minimum amount of Reddit comment karma.', id: '29' },
  '30': { text: 'Use the due date of a checked-out book.', id: '30' },
  '31': { text: 'Password is days until a domain expires.', id: '31' },
  '32': { text: 'Mimic a specific pose for the webcam.', id: '32' },
  '33': { text: 'Smile, frown or look surprised.', id: '33' },
  '34': { text: 'Hold a specific coloured object to the camera.', id: '34' },
  '35': { text: 'Clap a secret rhythm into your mic.', id: '35' },
  '36': { text: 'Tap your password in Morse code.', id: '36' },
  '37': { text: 'Shake your phone in a specific pattern.', id: '37' },
  '38': { text: 'Draw a shape in the air using webcam tracking.', id: '38' },
  '39': { text: 'Log in by typing rhythm and speed.', id: '39' },
  '40': { text: 'Say a phrase in a specific accent.', id: '40' },
  '41': { text: 'Blink a set pattern into the camera.', id: '41' },
  '42': { text: "Whistle a famous song's opening notes.", id: '42' },
  '43': { text: 'Login appears after 10 seconds of silence.', id: '43' },
  '44': { text: 'Measure heartbeat with phone camera.', id: '44' },
  '45': { text: 'Tap screen with a specific number of fingers.', id: '45' },
  '46': { text: 'Password must be a valid 5-7-5 haiku.', id: '46' },
  '47': { text: 'Choose the correct abstract image.', id: '47' },
  '48': { text: 'Answer a deep philosophical question.', id: '48' },
  '49': { text: 'Connect stars to draw a constellation.', id: '49' },
  '50': { text: 'Draw a unique magical sigil.', id: '50' }
};

ideaDisclaimer.hidden = true;

let currentIdea = null;

async function tryFetchWithFallback(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, options);
    if (res.ok) return res;
    console.warn(`❌ API responded with status ${res.status}: ${url}`);
  } catch (err) {
    console.warn(`❌ Failed on ${url}`, err);
  }
  throw new Error("API call failed");
}

async function fetchRandomIdea() {
  generateBtn.disabled = true;
  generateBtn.textContent = 'Generating...';
  acceptIdeaBtn.style.display = 'none';
  ideaContainer.style.display = 'block';
  ideaText.textContent = 'Loading idea...';
  ideaId.textContent = '';

  try {
    const res = await tryFetchWithFallback('/random', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const idea = await res.json();
    currentIdea = idea;
    ideaText.textContent = idea.text || idea.idea || 'Idea text missing';
    ideaId.textContent = `Idea ID: ${idea.id}`;
    acceptIdeaBtn.style.display = 'inline-block';
  } catch (e) {
    const ideaValues = Object.values(localIdeas);
    const idea = ideaValues[Math.floor(Math.random() * ideaValues.length)];
    console.error('❌ Error fetching idea:', e);
    ideaText.textContent = idea.text;
    ideaDisclaimer.hidden = false;
    currentIdea = idea;
  }

  generateBtn.disabled = false;
  generateBtn.textContent = 'Give me another idea!';
}

async function deleteCurrentIdea() {
  if (!currentIdea) return;

  acceptIdeaBtn.disabled = true;
  ideaText.textContent = 'Removing idea...';

  try {
    const res = await tryFetchWithFallback(`/delete/${currentIdea.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) throw new Error(`Failed to delete idea (${res.status})`);

    await res.json();
    alert('Idea accepted and removed from database!');
    hideConfirmPopup();
    acceptIdeaBtn.style.display = 'none';
    currentIdea = null;
  } catch (error) {
    console.error('❌ Error deleting idea:', error);
    alert('Could not remove idea. Please try again later.');
  } finally {
    acceptIdeaBtn.disabled = false;
  }
}

function showConfirmPopup() {
  confirmPopup.classList.remove('hidden');
}

function hideConfirmPopup() {
  confirmPopup.classList.add('hidden');
}

generateBtn.addEventListener('click', fetchRandomIdea);

acceptIdeaBtn.addEventListener('click', () => {
  if (!currentIdea) return;
  showConfirmPopup();
});

confirmContinue.addEventListener('click', () => {
  deleteCurrentIdea();
});

confirmBack.addEventListener('click', () => {
  hideConfirmPopup();
});

confirmPopup.addEventListener('click', (e) => {
  if (e.target === confirmPopup) {
    hideConfirmPopup();
  }
});
