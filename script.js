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
let currentwords = [];
let currentwordIndex = 0;
let correctAnswers = 0;
let wordShown = false;
let partCorrectCount = 0; // Zählt die korrekten Antworten im aktuellen Teil
let partTotalwords = 0; // Speichert die Gesamtzahl der Wörter im aktuellen Teil
let answerHistory = []; // Speichert den Verlauf der Antworten ('correct' oder 'incorrect')
let wordDisplayTimeout; // Variable, um den Timeout zu speichern


// Wortdaten
const wordData = {
    nomen: [
        { word: 'der Ball', sentence: 'Der xxxx ist rund.' },
        { word: 'der Baum', sentence: 'Der xxxx ist sehr hoch.' },
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
top100: [
    { word: 'der', sentence: 'Vor der Tür steht xxxx Postbote.' },
    { word: 'die', sentence: 'Ich sehe xxxx Frau.' },
    { word: 'und', sentence: 'Ich esse Brot xxxx Käse.' },
    { word: 'in', sentence: 'Das Buch ist xxxx der Tasche.' },
    { word: 'den', sentence: 'Ich sehe xxxx Film heute Abend.' },
    { word: 'von', sentence: 'Das ist ein Geschenk xxxx meinem Bruder.' },
    { word: 'zu', sentence: 'Ich gehe xxxx Schule.' },
    { word: 'das', sentence: 'xxxx Kind spielt im Garten.' },
    { word: 'mit', sentence: 'Ich gehe xxxx meinem Freund ins Kino.' },
    { word: 'sich', sentence: 'Er freut xxxx auf den Urlaub.' },
    { word: 'des', sentence: 'Die Farbe xxxx Autos ist rot.' },
    { word: 'auf', sentence: 'Das Buch liegt xxxx dem Tisch.' },
    { word: 'für', sentence: 'Das Geschenk ist xxxx dich.' },
    { word: 'ist', sentence: 'Heute xxxx das Wetter schön.' },
    { word: 'im', sentence: 'Er ist gerade xxxx Büro.' },
    { word: 'dem', sentence: 'Sie hilft xxxx Mann beim Kochen.' },
    { word: 'nicht', sentence: 'Ich weiß xxxx, ob er kommt.' },
    { word: 'ein', sentence: 'Ich habe xxxx Apfel gegessen.' },
    { word: 'Die', sentence: 'xxxx Katze schläft auf dem Sofa.' },
    { word: 'eine', sentence: 'Ich brauche xxxx neue Jacke.' },
    { word: 'als', sentence: 'Er ist größer xxxx ich.' },
    { word: 'auch', sentence: 'Ich möchte xxxx ein Eis.' },
    { word: 'es', sentence: 'Heute regnet xxxx.' },
    { word: 'an', sentence: 'Er denkt oft xxxx die Schule.' },
    { word: 'werden', sentence: 'Sie xxxx bald Eltern.' },
    { word: 'aus', sentence: 'Ich komme xxxx Berlin.' },
    { word: 'er', sentence: 'Wer ist xxxx?' },
    { word: 'hat', sentence: 'Sie xxxx einen Hund.' },
    { word: 'dass', sentence: 'Ich denke, xxxx er nett ist.' },
    { word: 'wir', sentence: 'Morgen gehen xxxx schwimmen.' },
    { word: 'was', sentence: 'Weißt du, xxxx das ist?' },
    { word: 'sein', sentence: 'Er möchte Lehrer xxxx.' },
    { word: 'bei', sentence: 'Ich wohne xxxx meinen Eltern.' },
    { word: 'einen', sentence: 'Er hat xxxx neuen Job.' },
    { word: 'noch', sentence: 'Ich habe xxxx Hunger.' },
    { word: 'wie', sentence: 'Das ist xxxx ein Gewinn.' },
    { word: 'einem', sentence: 'Sie hilft xxxx alten Mann.' },
    { word: 'über', sentence: 'Wir sprechen xxxx das Buch.' },
    { word: 'man', sentence: 'Sollte xxxx lügen?' },
    { word: 'mir', sentence: 'Gib xxxx bitte das Salz.' },
    { word: 'ihm', sentence: 'Ich habe xxxx das Buch gegeben.' },
    { word: 'uns', sentence: 'Er besucht xxxx morgen.' },
    { word: 'da', sentence: 'Der Bus steht xxxx!' },
    { word: 'zum', sentence: 'Ich gehe xxxx Arzt.' },
    { word: 'kann', sentence: 'Er xxxx gut schwimmen.' },
    { word: 'doch', sentence: 'Komm xxxx mit!' },
    { word: 'vor', sentence: 'Stell dich xxxx die Tür.' },
    { word: 'dieser', sentence: 'Mein Lehrer ist xxxx Mann.' },
    { word: 'mich', sentence: 'Ruf xxxx bitte an!' },
    { word: 'ihn', sentence: 'Ich habe xxxx gesehen.' },
    { word: 'durch', sentence: 'Er läuft xxxx den Park.' },
    { word: 'mehr', sentence: 'Ich will xxxx Schokolade.' },
    { word: 'wird', sentence: 'Er xxxx bald Vater.' },
    { word: 'am', sentence: 'Ich bin xxxx Wochenende zu Hause.' },
    { word: 'sind', sentence: 'Wir xxxx Freunde.' },
    { word: 'noch', sentence: 'Sie schläft xxxx.' },
    { word: 'nur', sentence: 'Ich habe xxxx zehn Euro.' },
    { word: 'schon', sentence: 'Ich bin xxxx fertig.' },
    { word: 'oder', sentence: 'Tee xxxx Kaffee?' },
    { word: 'wir', sentence: 'Treffen xxxx wir uns um acht.' },
    { word: 'wenn', sentence: 'Ruf mich an, xxxx du Zeit hast.' },
    { word: 'aber', sentence: 'Ich mag Pizza, xxxx nicht heute.' },
    { word: 'dann', sentence: 'Wir essen und xxxx gehen wir spazieren.' },
    { word: 'alle', sentence: 'Spielen xxxx Kinder draußen?' },
    { word: 'nach', sentence: 'Ich fahre xxxx Hause.' },
    { word: 'mehr', sentence: 'Ich brauche xxxx Informationen.' },
    { word: 'vor', sentence: 'Ich bin xxxx dem Haus.' },
    { word: 'muss', sentence: 'Ich xxxx morgen arbeiten.' },
    { word: 'ohne', sentence: 'Ich gehe nicht xxxx Jacke raus.' },
    { word: 'immer', sentence: 'Er kommt xxxx zu spät.' },
    { word: 'sein', sentence: 'Das muss xxxx Traum gewesen sein.' },
    { word: 'ganz', sentence: 'Das ist xxxx einfach.' },
    { word: 'hier', sentence: 'Komm xxxx her!' },
    { word: 'mal', sentence: 'Probier das xxxx!' },
    { word: 'etwas', sentence: 'Ich will xxxx essen.' },
    { word: 'wieder', sentence: 'Sie kommt morgen xxxx.' },
    { word: 'sehr', sentence: 'Ich bin xxxx müde.' },
    { word: 'uns', sentence: 'Er hat xxxx eingeladen.' },
    { word: 'denn', sentence: 'Ich gehe, xxxx es ist spät.' },
    { word: 'nun', sentence: 'Was machen wir xxxx?' },
    { word: 'jetzt', sentence: 'Wir gehen xxxx schlafen.' },
    { word: 'ja', sentence: 'Nein oder xxxx.' },
    { word: 'also', sentence: 'Wir sollten xxxx gehen.' },
    { word: 'bis', sentence: 'Warte xxxx morgen.' },
    { word: 'soll', sentence: 'Er xxxx mehr lernen.' },
    { word: 'selbst', sentence: 'Er hat das xxxx gemacht.' },
    { word: 'sehen', sentence: 'Ich will den Film xxxx.' },
    { word: 'lassen', sentence: 'Er will sich nicht helfen xxxx.' },
    { word: 'unsere', sentence: 'Frau Meier, xxxx Lehrerin, ist nett.' },
    { word: 'dein', sentence: 'Wo ist xxxx Buch?' },
    { word: 'nein', sentence: 'Ja oder xxxx.' },
    { word: 'heute', sentence: 'Der Tag xxxx ist schön.' },
    { word: 'dieses', sentence: 'xxxx Buch gefällt mir.' },
    { word: 'mich', sentence: 'Er hat xxxx angerufen.' },
    { word: 'diese', sentence: 'Möchtest du xxxx Hose.' },
    { word: 'euch', sentence: 'Ich habe xxxx gesehen.' },
    { word: 'alle', sentence: 'Ich habe xxxx eingeladen.' },
],
merkwörter: [
  { word: 'die Beere', sentence: 'Ich habe eine rote xxxx am Weg gefunden.' },
  { word: 'das Boot', sentence: 'Auf dem See fährt das xxxx.' },
  { word: 'das Haar', sentence: 'Auf dem Kissen lag ein einzelnes blondes xxxx.' },
  { word: 'die Idee', sentence: 'Sie hatte plötzlich eine tolle xxxx!' },
  { word: 'das Meer', sentence: 'Wir machten Urlaub am großen xxxx.' },
  { word: 'das Moos', sentence: 'Der Waldboden war mit weichem xxxx bedeckt.' },
  { word: 'der See', sentence: 'Im Sommer baden wir gerne in dem tollen xxxx.' },
  { word: 'der Tee', sentence: 'Zum Frühstück trinke ich immer eine Tasse warmen xxxx.' },
  { word: 'der Zoo', sentence: 'Am Wochenende besuchen wir den xxxx.' },
  { word: 'ihm', sentence: 'Das Geschenk hat xxxx sehr gefallen.' },
  { word: 'ihn', sentence: 'Hast du xxxx gestern im Park gesehen?' },
  { word: 'ihr', sentence: 'Das neue Kleid stand xxxx ausgezeichnet.' },
  { word: 'im', sentence: 'Bunte Blumen blühten xxxx Garten.' },
  { word: 'in', sentence: 'Die Katze versteckte sich xxxx der Kiste.' },
  { word: 'der Bär', sentence: 'Wir haben einen großen, braunen xxxx im Wald gesehen.' },
  { word: 'der Käfer', sentence: 'Ein kleiner xxxx ist auf der Blüte gekrabbelt.' },
  { word: 'der Käse', sentence: 'Zum Abendessen gab es Brot mit leckerem xxxx.' },
  { word: 'der Lärm', sentence: 'Der xxxx von der Straße war ganz laut.' },
  { word: 'das Mädchen', sentence: 'Das kleine xxxx hat im Sand gespielt.' },
  { word: 'der März', sentence: 'Der Frühling beginnt im xxxx.' },
  { word: 'fleißig', sentence: 'Die Schülerin hat sehr xxxx an ihrer Aufgabe gearbeitet.' },
  { word: 'der Fuß', sentence: 'Ich bin barfuß auf den kalten xxxx getreten.' },
  { word: 'der Gruß', sentence: 'Sie hat uns liebe xxxx aus dem Urlaub geschickt.' },
  { word: 'heiß', sentence: 'Die Suppe war noch ganz xxxx.' },
  { word: 'heißen', sentence: 'Die Kinder haben laut xxxx angefangen.' },
  { word: 'der Spaß', sentence: 'Wir hatten viel xxxx beim Spielen zusammen.' },
  { word: 'süß', sentence: 'Die Erdbeeren haben ganz xxxx geschmeckt.' },
  { word: 'die Vase', sentence: 'Auf dem Tisch stand eine xxxx mit bunten Blumen.' },
  { word: 'vier', sentence: 'Wir haben uns um xxxx Uhr getroffen.' },
  { word: 'der Vogel', sentence: 'Ein bunter xxxx hat im Baum gesungen.' },
  { word: 'voll', sentence: 'Der Bus war ganz xxxx mit Leuten.' },
  { word: 'vorbei', sentence: 'Die schöne Zeit ist viel zu schnell xxxx gegangen.' },
  { word: 'der Vulkan', sentence: 'Der xxxx ist vor langer Zeit ausgebrochen.' },
  { word: 'der Verkäufer', sentence: 'Der nette xxxx hat uns gut geholfen.' },
  { word: 'der Verkehr', sentence: 'Die Autos auf der Autobahn standen im xxxx.' },
  { word: 'der Vorname', sentence: 'Ihr xxxx ist ein bisschen besonders.' },
  { word: 'das Baby', sentence: 'Das kleine xxxx hat friedlich geschlafen.' },
  { word: 'der Clown', sentence: 'Der lustige xxxx hat alle zum Lachen gebracht.' },
  { word: 'die E-Mail', sentence: 'Ich habe dir eine xxxx geschrieben.' },
  { word: 'die Pizza', sentence: 'Wir bestellen uns eine leckere xxxx zum Essen.' },
  { word: 'das Tablet', sentence: 'Mit dem xxxx kann man gut im Internet schauen.' },
  { word: 'der Teddy', sentence: 'Das Kind hat mit seinem weichen xxxx gekuschelt.' },
  { word: 'sechs', sentence: 'Wir waren xxxx Freunde, die sich getroffen haben.' },
  { word: 'zehn', sentence: 'In unserer Gruppe waren genau xxxx Kinder.' }
]


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
        currentwords = wordData[currentCategory];
        showTrainingSections();
        startContainer.style.display = 'none';
        trainingContainer.style.display = 'block';
    }
});

function showTrainingSections() {
    console.log('showTrainingSections aufgerufen. currentwords (Länge):', currentwords ? currentwords.length : 0, currentwords);
    trainingSections.innerHTML = '';
    const wordsPerPage = 10; // Anzahl der Wörter pro Teil
    const numSections = Math.ceil(currentwords.length / wordsPerPage);
    for (let i = 0; i < numSections; i++) {
        const sectionBtn = document.createElement('button');
        sectionBtn.textContent = `Teil ${i + 1}`;
        sectionBtn.dataset.section = i;
        sectionBtn.addEventListener('click', () => startExercise(i, wordsPerPage));
        trainingSections.appendChild(sectionBtn);
    }
}

function startExercise(sectionIndex, wordsPerPage) {
    // Abbruch eines eventuell noch laufenden Timers
    if (wordDisplayTimeout) {
        clearTimeout(wordDisplayTimeout);
    }

    const startIndex = sectionIndex * wordsPerPage;
    const endIndex = Math.min(startIndex + wordsPerPage, wordData[currentCategory].length);
    const selectedwords = wordData[currentCategory].slice(startIndex, endIndex);
    currentwords = selectedwords;
    currentwordIndex = 0;
    correctAnswers = 0;
    wordDisplay.textContent = '';
    sentenceDisplay.textContent = '';
    answerInput.style.display = 'none'; // Sicherstellen, dass das Eingabefeld ausgeblendet ist
    answerInput.value = '';             // Eingabefeld zurücksetzen
    feedbackDisplay.textContent = '';
    partCorrectCount = 0;
    partTotalwords = currentwords.length;
    answerHistory = [];
    updateProgressBar();
    updateProgressText();
    console.log(`startExercise(Teil ${sectionIndex + 1}):`);
    console.log('  startIndex:', startIndex);
    console.log('  endIndex:', endIndex);
    console.log('  selectedwords (Länge):', selectedwords.length, selectedwords);
    console.log('  currentwords (Länge nach Slice):', currentwords.length, currentwords);
    console.log('  currentwordIndex:', currentwordIndex);
    showword();
    trainingContainer.style.display = 'none';
    exerciseContainer.style.display = 'block';
}

function showword() {
    console.log('showword() aufgerufen. currentwordIndex:', currentwordIndex, 'currentwords.length:', currentwords.length);
    const checkButton = document.getElementById('check-answer-btn');
    checkButton.disabled = true;

    if (currentwordIndex < currentwords.length) {
        const currentwordData = currentwords[currentwordIndex];
        wordDisplay.textContent = currentwordData.word;
        wordShown = true;
        wordDisplayTimeout = setTimeout(() => { // Speichere den Timeout in der Variablen
            wordDisplay.textContent = '';
            sentenceDisplay.textContent = currentwordData.sentence.replace('xxxx', '____');
            answerInput.style.display = 'block';
            answerInput.value = '';
            feedbackDisplay.textContent = '';
            wordShown = false;
            checkButton.disabled = false;
        }, 5000);
    } else {
        console.log('ALLE WÖRTER BEANTWORTET. Rufe showResults() auf.');
        showResults();
    }
}

document.getElementById('check-answer-btn').addEventListener('click', () => {
    const checkButton = document.getElementById('check-answer-btn');
    checkButton.disabled = true;

    console.log('Prüfen-Button geklickt. currentwordIndex:', currentwordIndex, 'currentwords.length:', currentwords.length); // ERWEITERT

    if (wordShown) {
        return;
    }
    const answer = answerInput.value.trim();
    const correctword = currentwords[currentwordIndex].word.trim();
    const correctwordWithoutArticle = correctword.replace(/^(der|die|das)\s+/i, '');

    if (answer === correctwordWithoutArticle) {
        feedbackDisplay.textContent = 'Richtig!';
        feedbackDisplay.className = 'correct';
        correctAnswers++;
        partCorrectCount++;
        answerHistory.push('correct');
    } else {
        feedbackDisplay.textContent = `Falsch! Richtig wäre: ${currentwords[currentwordIndex].word}`;
        feedbackDisplay.className = 'incorrect';
        answerHistory.push('incorrect');
    }
    updateProgressBar();
    updateProgressText();

    // Überprüfe, ob dies das letzte Wort war
    if (currentwordIndex === currentwords.length - 1) {
        console.log('LETZTES WORT ERREICHT. Rufe showResults() direkt auf.');
        showResults();
        checkButton.disabled = false; // Re-enable button if needed after results
    } else {
        setTimeout(() => {
            sentenceDisplay.textContent = "";
            feedbackDisplay.textContent = "";
            answerInput.style.display = 'none';
            currentwordIndex++;
            console.log('  currentwordIndex (nach Timeout):', currentwordIndex);
            showword();
            checkButton.disabled = false;
        }, 2000);
    }
});

document.getElementById('next-word-btn').addEventListener('click', () => {
    currentwordIndex++;
    console.log('Nächstes Wort geklickt. currentwordIndex:', currentwordIndex); // HINZUGEFÜGT
    showword();
});

function updateProgressBar() {
    const progressBarElement = document.getElementById('progress-bar');
    if (progressBarElement && partTotalwords > 0) {
        progressBarElement.innerHTML = ''; // Leere den vorherigen Inhalt
        const wordWidthPercentage = 100 / partTotalwords;
        answerHistory.forEach(result => {
            const span = document.createElement('span');
            span.style.width = `${wordWidthPercentage}%`;
            span.style.display = 'inline-block';
            span.style.height = '100%'; // Optionale HÃ¶he

            if (result === 'correct') {
                span.style.backgroundColor = 'green';
            } else if (result === 'incorrect') {
                span.style.backgroundColor = 'red';
            } else {
                span.style.backgroundColor = '#ddd'; // Optionale Farbe fÃ¼r noch nicht beantwortete
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
        totalInPartElement.textContent = partTotalwords;
    }
}

function showResults() {
    alert(`Du hast ${correctAnswers} von ${currentwords.length} Wörtern richtig.`);
    exerciseContainer.style.display = 'none';
    trainingContainer.style.display = 'block';
}
document.getElementById('back-to-start-btn').addEventListener('click', () => {
    // Abbruch eines eventuell noch laufenden Timers
    if (wordDisplayTimeout) {
        clearTimeout(wordDisplayTimeout);
    }
    // Zurücksetzen der Anzeigen im Exercise-Container
    wordDisplay.textContent = '';
    sentenceDisplay.textContent = '';
    answerInput.style.display = 'none';
    answerInput.value = '';
    feedbackDisplay.textContent = '';
    exerciseContainer.style.display = 'none';
    startContainer.style.display = 'block';
});

document.getElementById('back-to-training-btn').addEventListener('click', () => {
    // Abbruch eines eventuell noch laufenden Timers
    if (wordDisplayTimeout) {
        clearTimeout(wordDisplayTimeout);
    }
    // Zurücksetzen der Anzeigen im Exercise-Container
    wordDisplay.textContent = '';
    sentenceDisplay.textContent = '';
    answerInput.style.display = 'none';
    answerInput.value = '';
    feedbackDisplay.textContent = '';
    exerciseContainer.style.display = 'none';
    trainingContainer.style.display = 'block';
});

trainingSections.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.dataset.section) {
        const sectionIndex = parseInt(event.target.dataset.section);
        const wordsPerPage = 10;
        console.log('Teil-Button geklickt. Starte Teil:', sectionIndex + 1, 'sectionIndex:', sectionIndex);
        startExercise(sectionIndex, wordsPerPage);
    }
});
