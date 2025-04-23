const loginContainer = document.getElementById('login-container');
const startContainer = document.getElementById('start-container');
const trainingContainer = document.getElementById('training-container');
const exerciseContainer = document.getElementById('exercise-container');
const trainingSections = document.getElementById('training-sections');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const wordDisplay = document.getElementById('word-display');
const sentenceDisplay = document.getElementById('sentence-display');
const answerInput = document.getElementById('answer-input');
const feedbackDisplay = document.getElementById('feedback-display');
const progressBar = document.getElementById('progress-bar'); // Fortschrittsbalken-Element
const correctCountSpan = document.getElementById('correct-count'); // Element für korrekte Zählung
const totalInPartSpan = document.getElementById('total-in-part'); // Element für Gesamtzahl im Teil

let currentUser = null;
let currentCategory = null;
let currentWords = [];
let currentWordIndex = 0;
let correctAnswers = 0;
let wordShown = false;
let partCorrectCount = 0; // Zählt die korrekten Antworten im aktuellen Teil
let partTotalWords = 0; // Speichert die Gesamtzahl der Wörter im aktuellen Teil
let answerHistory = []; // Speichert den Verlauf der Antworten ('correct' oder 'incorrect')

// Wortdaten
const wordData = {
    nomen: [
        { word: 'der Ball', sentence: 'Der xxxx ist rund.' },
        { word: 'der Baum', sentence: 'Der xxxx ist sehr hoch.' },
        { word: 'das Boot', sentence: 'Das xxxx fährt auf dem See.' },
        { word: 'der Bus', sentence: 'Der xxxx fährt pünktlich.' },
        { word: 'das Ei', sentence: 'Das xxxx ist gekocht.' },
        { word: 'das Eis', sentence: 'Das xxxx schmeckt lecker.' },
        { word: 'der Fisch', sentence: 'Der xxxx schwimmt im Wasser.' },
        { word: 'die Frau', sentence: 'Die xxxx ist nett.' },
        { word: 'der Fuß', sentence: 'Der xxxx tut weh.' },
        { word: 'das Haar', sentence: 'Das xxxx ist lang.' },
        { word: 'die Hand', sentence: 'Die xxxx ist warm.' },
        { word: 'der Hase', sentence: 'Der xxxx ist schnell.' },
        { word: 'das Haus', sentence: 'Das xxxx ist groß.' },
        { word: 'der Hund', sentence: 'Der xxxx bellt laut.' },
        { word: 'das Jahr', sentence: 'Das xxxx hat 365 Tage.' },
        { word: 'die Katze', sentence: 'Die xxxx schnurrt.' },
        { word: 'das Kind', sentence: 'Das xxxx lacht.' },
        { word: 'die Kuh', sentence: 'Die xxxx gibt Milch.' },
        { word: 'die Mama', sentence: 'Die xxxx ist lieb.' },
        { word: 'der Mann', sentence: 'Der xxxx ist groß.' },
        { word: 'die Maus', sentence: 'Die xxxx ist klein.' },
        { word: 'das Meer', sentence: 'Das xxxx ist tief.' },
        { word: 'die Milch', sentence: 'Die xxxx ist weiß.' },
        { word: 'der Mond', sentence: 'Der xxxx scheint hell.' },
        { word: 'der Mund', sentence: 'Der xxxx ist rot.' },
        { word: 'die Mutter', sentence: 'Die xxxx ist lieb.' },
        { word: 'die Nase', sentence: 'Die xxxx ist rot.' },
        { word: 'das Nest', sentence: 'Das xxxx ist hoch im Baum.' },
        { word: 'die Oma', sentence: 'Die xxxx ist alt.' },
        { word: 'der Opa', sentence: 'Der xxxx ist weise.' },
        { word: 'der Papa', sentence: 'Der xxxx ist stark.' },
        { word: 'das Pferd', sentence: 'Das xxxx ist schnell.' },
        { word: 'der Platz', sentence: 'Der xxxx ist groß.' },
        { word: 'die Puppe', sentence: 'Die xxxx ist schön.' },
        { word: 'der Regen', sentence: 'Der xxxx ist nass.' },
        { word: 'der Rock', sentence: 'Der xxxx ist kurz.' },
        { word: 'das Schaf', sentence: 'Das xxxx ist weiß.' },
        { word: 'der Schnee', sentence: 'Der xxxx ist kalt.' },
        { word: 'der See', sentence: 'Der xxxx ist tief.' },
        { word: 'die Sonne', sentence: 'Die xxxx scheint hell.' },
        { word: 'der Spaß', sentence: 'Der xxxx ist groß.' },
        { word: 'der Stern', sentence: 'Der xxxx leuchtet.' },
        { word: 'der Tag', sentence: 'Der xxxx ist schön.' },
        { word: 'die Tasse', sentence: 'Die xxxx ist heiß.' },
        { word: 'der Tee', sentence: 'Der xxxx ist warm.' },
        { word: 'der Tod', sentence: 'Der xxxx ist traurig.' },
        { word: 'die Uhr', sentence: 'Die xxxx ist rund.' },
        { word: 'der Vater', sentence: 'Der xxxx ist stark.' },
        { word: 'der Vogel', sentence: 'Der xxxx fliegt.' },
        { word: 'der Wald', sentence: 'Der xxxx ist grün.' },
        { word: 'das Wasser', sentence: 'Das xxxx ist nass.' },
        { word: 'der Weg', sentence: 'Der xxxx ist lang.' },
        { word: 'die Welt', sentence: 'Die xxxx ist groß.' },
        { word: 'die Wolke', sentence: 'Die xxxx ist weiß.' },
        { word: 'der Zahn', sentence: 'Der xxxx tut weh.' },
        { word: 'die Zeit', sentence: 'Die xxxx vergeht schnell.' },
        { word: 'die Ziege', sentence: 'Die xxxx meckert.' },
        { word: 'das Zimmer', sentence: 'Das xxxx ist groß.' },
        { word: 'die Zitrone', sentence: 'Die xxxx ist sauer.' },
        { word: 'der Zoo', sentence: 'Der xxxx ist interessant.' },
        { word: 'der Zug', sentence: 'Der xxxx fährt pünktlich ab.' },
    ],
    // Hier könnten weitere Kategorien wie 'verben' etc. folgen
};

// Benutzerverwaltung (vereinfacht)
const users = [];

document.getElementById('login-btn').addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        loginContainer.style.display = 'none';
        startContainer.style.display = 'block';
    } else {
        alert('Falscher Benutzername oder Passwort.');
    }
});

document.getElementById('register-btn').addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    users.push({ username, password, progress: {} });
    alert('Registrierung erfolgreich.');
});

document.getElementById('logout-btn').addEventListener('click', () => {
    currentUser = null;
    startContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

startContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.dataset.category) {
        currentCategory = event.target.dataset.category;
        console.log('Ausgewählte Kategorie:', currentCategory);
        console.log('Daten für Kategorie:', wordData[currentCategory]);
        currentWords = wordData[currentCategory];
        showTrainingSections();
        startContainer.style.display = 'none';
        trainingContainer.style.display = 'block';
    }
});

function showTrainingSections() {
    console.log('showTrainingSections aufgerufen. currentWords (Länge):', currentWords ? currentWords.length : 0, currentWords);
    trainingSections.innerHTML = '';
    const wordsPerPage = 10; // Anzahl der Wörter pro Teil
    const numSections = Math.ceil(currentWords.length / wordsPerPage);
    for (let i = 0; i < numSections; i++) {
        const sectionBtn = document.createElement('button');
        sectionBtn.textContent = `Teil ${i + 1}`;
        sectionBtn.dataset.section = i;
        sectionBtn.addEventListener('click', () => startExercise(i, wordsPerPage));
        trainingSections.appendChild(sectionBtn);
    }
}

function startExercise(sectionIndex, wordsPerPage) {
    const startIndex = sectionIndex * wordsPerPage;
    const endIndex = Math.min(startIndex + wordsPerPage, wordData[currentCategory].length);
    const selectedWords = wordData[currentCategory].slice(startIndex, endIndex);
    currentWords = selectedWords;
    currentWordIndex = 0;
    correctAnswers = 0;
    wordDisplay.textContent = '';
    sentenceDisplay.textContent = '';
    partCorrectCount = 0; // Zurücksetzen des korrekten Zählers für den neuen Teil
    partTotalWords = currentWords.length; // Setzen der Gesamtzahl der Wörter für den Teil
    answerHistory = []; // Zurücksetzen der Antwort-Historie für den neuen Teil
    updateProgressBar(); // Initialen Fortschrittsbalken anzeigen (leer)
    updateProgressText(); // Initialen Fortschrittszähler anzeigen (0 von X)
    console.log(`startExercise(Teil ${sectionIndex + 1}):`);
    console.log('  startIndex:', startIndex);
    console.log('  endIndex:', endIndex);
    console.log('  selectedWords (Länge):', selectedWords.length, selectedWords);
    console.log('  currentWords (Länge nach Slice):', currentWords.length, currentWords);
    console.log('  currentWordIndex:', currentWordIndex);
    showWord();
    trainingContainer.style.display = 'none';
    exerciseContainer.style.display = 'block';
}

function showWord() {
    if (currentWordIndex < currentWords.length) {
        const currentWordData = currentWords[currentWordIndex];
        wordDisplay.textContent = currentWordData.word;
        wordShown = true;
        setTimeout(() => {
            wordDisplay.textContent = '';
            sentenceDisplay.textContent = currentWordData.sentence.replace('xxxx', '____');
            answerInput.style.display = 'block';
            answerInput.value = '';
            feedbackDisplay.textContent = '';
            wordShown = false;
        }, 5000);
    } else {
        showResults();
    }
}

document.getElementById('check-answer-btn').addEventListener('click', () => {
    console.log('Prüfen-Button wurde geklickt!');
    console.log('  currentWordIndex:', currentWordIndex);
    console.log('  currentWords:', currentWords);
    if (wordShown) {
        return;
    }
    const answer = answerInput.value.trim();
    const correctWord = currentWords[currentWordIndex].word.trim();
    const correctWordWithoutArticle = correctWord.replace(/^(der|die|das)\s+/i, '');

    if (answer === correctWordWithoutArticle) {
        feedbackDisplay.textContent = 'Richtig!';
        feedbackDisplay.className = 'correct';
        correctAnswers++;
        partCorrectCount++; // Inkrementiere den Zähler für den aktuellen Teil
        answerHistory.push('correct'); // Speichere das Ergebnis für den Fortschrittsbalken
    } else {
        feedbackDisplay.textContent = `Falsch! Richtig wäre: ${currentWords[currentWordIndex].word}`;
        feedbackDisplay.className = 'incorrect';
        answerHistory.push('incorrect'); // Speichere das Ergebnis für den Fortschrittsbalken
    }
    updateProgressBar(); // Aktualisiere den Fortschrittsbalken
    updateProgressText(); // Aktualisiere den Fortschrittszähler
    setTimeout(() => {
        sentenceDisplay.textContent = "";
        feedbackDisplay.textContent = "";
        answerInput.style.display = 'none';
        currentWordIndex++;
        showWord();
    }, 2000);
});

document.getElementById('next-word-btn').addEventListener('click', () => {
    currentWordIndex++;
    showWord();
});

function updateProgressBar() {
    const progressBarElement = document.getElementById('progress-bar');
    if (progressBarElement && partTotalWords > 0) {
        progressBarElement.innerHTML = ''; // Leere den vorherigen Inhalt
        const wordWidthPercentage = 100 / partTotalWords;
        answerHistory.forEach(result => {
            const span = document.createElement('span');
            span.style.width = `${wordWidthPercentage}%`;
            span.style.display = 'inline-block';
            if (result === 'correct') {
                span.style.backgroundColor = 'green';
            } else if (result === 'incorrect') {
                span.style.backgroundColor = 'red';
            }
            progressBarElement.appendChild(span);
        });
    }
}

function updateProgressText() {
    const correctCountElement = document.getElementById('correct-count');
    const totalInPartElement = document.getElementById('total-in-part');
    if (correctCountElement && totalInPartElement) {
        correctCountElement.textContent = partCorrectCount;
        totalInPartElement.textContent = partTotalWords;
    }
}

function showResults() {
    alert(`Du hast ${correctAnswers} von ${currentWords.length} Wörtern richtig.`);
    exerciseContainer.style.display = 'none';
    trainingContainer.style.display = 'block';
}

document.getElementById('back-to-start-btn').addEventListener('click', () => {
    trainingContainer.style.display = 'none';
    startContainer.style.display = 'block';
});

document.getElementById('back-to-training-btn').addEventListener('click', () => {
    exerciseContainer.style.display = 'none';
    trainingContainer.style.display = 'block';
    sentenceDisplay.textContent = "";
    answerInput.style.display = 'none';
    feedbackDisplay.textContent = "";
    wordDisplay.textContent = "";
    wordShown = false;
    currentWords = wordData[currentCategory];
    showTrainingSections();
    console.log('Zurück zum Training. currentWords:', currentWords);
});

trainingSections.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.dataset.section) {
        const sectionIndex = parseInt(event.target.dataset.section);
        const wordsPerPage = 10;
        console.log('Teil-Button geklickt. Starte Teil:', sectionIndex + 1, 'sectionIndex:', sectionIndex);
        startExercise(sectionIndex, wordsPerPage);
    }
});