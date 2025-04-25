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
],nomen2: [
  { nomen: "der Abend", satz: "Der Abend war sehr schön." },
  { nomen: "der Affe", satz: "Der Affe im Zoo ist sehr lustig." },
  { nomen: "die Angst", satz: "Ich habe Angst vor Spinnen." },
  { nomen: "der Apfel", satz: "Der Apfel schmeckt süß." },
  { nomen: "der Arzt", satz: "Der Arzt hat mir ein Rezept verschrieben." },
  { nomen: "das Auge", satz: "Das Auge tränt." },
  { nomen: "die Banane", satz: "Die Banane ist gelb." },
  { nomen: "das Beispiel", satz: "Das Beispiel ist sehr hilfreich." },
  { nomen: "der Berg", satz: "Der Berg ist hoch." },
  { nomen: "die Birne", satz: "Die Birne ist saftig." },
  { nomen: "der Brief", satz: "Der Brief ist angekommen." },
  { nomen: "der Bruder", satz: "Der Bruder hilft mir oft." },
  { nomen: "das Buch", satz: "Das Buch ist spannend." },
  { nomen: "die Burg", satz: "Die Burg ist alt." },
  { nomen: "der Cent", satz: "Der Cent ist eine kleine Münze." },
  { nomen: "der Chor", satz: "Der Chor singt schön." },
  { nomen: "das Fahrrad", satz: "Das Fahrrad ist kaputt." },
  { nomen: "die Ferien", satz: "Die Ferien sind bald vorbei." },
  { nomen: "der Fernseher", satz: "Der Fernseher ist groß." },
  { nomen: "die Flasche", satz: "Die Flasche ist leer." },
  { nomen: "das Flugzeug", satz: "Das Flugzeug fliegt hoch." },
  { nomen: "der Freitag", satz: "Der Freitag ist mein Lieblingstag." },
  { nomen: "das Frühstück", satz: "Das Frühstück ist lecker." },
  { nomen: "der Freund", satz: "Der Freund ist lustig." },
  { nomen: "der Fuchs", satz: "Der Fuchs ist schlau." },
  { nomen: "die Gabel", satz: "Die Gabel ist aus Metall." },
  { nomen: "die Geburt", satz: "Die Geburt ist ein besonderes Ereignis." },
  { nomen: "die Geschichte", satz: "Die Geschichte ist spannend." },
  { nomen: "das Gewitter", satz: "Das Gewitter ist laut." },
  { nomen: "die Giraffe", satz: "Die Giraffe ist groß." },
  { nomen: "das Glück", satz: "Das Glück ist mit mir." },
  { nomen: "die Gruppe", satz: "Die Gruppe ist groß." },
  { nomen: "das Handy", satz: "Das Handy ist neu." },
  { nomen: "das Heft", satz: "Das Heft ist voll." },
  { nomen: "die Hexe", satz: "Die Hexe ist böse." },
  { nomen: "die Hose", satz: "Die Hose ist blau." },
  { nomen: "die Idee", satz: "Die Idee ist gut." },
  { nomen: "die Jacke", satz: "Die Jacke ist warm." },
  { nomen: "der Junge", satz: "Der Junge spielt Fußball." },
  { nomen: "die Karte", satz: "Die Karte ist bunt." },
  { nomen: "der Käse", satz: "Der Käse schmeckt gut." },
  { nomen: "die Kirche", satz: "Die Kirche ist alt." },
  { nomen: "die Kirsche", satz: "Die Kirsche ist rot." },
  { nomen: "der Knopf", satz: "Der Knopf ist rund." },
  { nomen: "der Korb", satz: "Der Korb ist voll." },
  { nomen: "das Kreuz", satz: "Das Kreuz ist ein Symbol." },
  { nomen: "die Küche", satz: "Die Küche ist sauber." },
  { nomen: "das Laub", satz: "Das Laub ist bunt." },
  { nomen: "der Lehrer", satz: "Der Lehrer erklärt den Stoff." },
  { nomen: "der Löffel", satz: "Der Löffel ist aus Silber." },
  { nomen: "der Löwe", satz: "Der Löwe brüllt laut." },
  { nomen: "die Mappe", satz: "Die Mappe ist voll mit Blättern." },
  { nomen: "das Messer", satz: "Das Messer ist scharf." },
  { nomen: "die Minute", satz: "Die Minute ist kurz." },
  { nomen: "der Mittag", satz: "Der Mittag ist heiß." },
  { nomen: "der Montag", satz: "Der Montag ist der erste Tag der Woche." },
  { nomen: "die Mütze", satz: "Die Mütze ist warm." },
  { nomen: "der Nachbar", satz: "Der Nachbar ist freundlich." },
  { nomen: "der Nachmittag", satz: "Der Nachmittag ist schön." },
  { nomen: "die Nähe", satz: "Die Nähe zum Meer ist toll." },
  { nomen: "das Nashorn", satz: "Das Nashorn ist stark." },
  { nomen: "die Note", satz: "Die Note ist gut." },
  { nomen: "der Papagei", satz: "Der Papagei spricht." },
  { nomen: "die Pappe", satz: "Die Pappe ist dünn." },
  { nomen: "die Pflanze", satz: "Die Pflanze ist grün." },
  { nomen: "das Pflaster", satz: "Das Pflaster ist auf der Wunde." },
  { nomen: "der Pinsel", satz: "Der Pinsel ist nass." },
  { nomen: "der Pullover", satz: "Der Pullover ist warm." },
  { nomen: "der Rauch", satz: "Der Rauch ist schwarz." },
  { nomen: "die Rettung", satz: "Die Rettung kam schnell." },
  { nomen: "der Samstag", satz: "Der Samstag ist ein schöner Tag." },
  { nomen: "der Schal", satz: "Der Schal ist warm." },
  { nomen: "die Schaufel", satz: "Die Schaufel ist groß." },
  { nomen: "die Schaukel", satz: "Die Schaukel ist lustig." },
  { nomen: "das Schiff", satz: "Das Schiff ist groß." },
  { nomen: "das Schloss", satz: "Das Schloss ist alt." },
  { nomen: "der Schluss", satz: "Der Schluss ist gut." },
  { nomen: "der Spiegel", satz: "Der Spiegel ist sauber." },
  { nomen: "die Spinne", satz: "Die Spinne krabbelt." },
  { nomen: "der Sport", satz: "Der Sport ist gesund." },
  { nomen: "die Stadt", satz: "Die Stadt ist groß." },
  { nomen: "der Stein", satz: "Der Stein ist hart." },
  { nomen: "die Straße", satz: "Die Straße ist lang." },
  { nomen: "das Stück", satz: "Das Stück ist klein." },
  { nomen: "die Stunde", satz: "Die Stunde ist kurz." },
  { nomen: "die Tafel", satz: "Die Tafel ist schwarz." },
  { nomen: "die Tasche", satz: "Die Tasche ist voll." },
  { nomen: "der Teller", satz: "Der Teller ist leer." },
  { nomen: "der Tipp", satz: "Der Tipp ist gut." },
  { nomen: "der Tisch", satz: "Der Tisch ist groß." },
  { nomen: "die Treppe", satz: "Die Treppe ist lang." },
  { nomen: "der Uhu", satz: "Der Uhu ist nachtaktiv." },
  { nomen: "der Urlaub", satz: "Der Urlaub ist schön." },
  { nomen: "der Vampir", satz: "Der Vampir ist blass." },
  { nomen: "der Verkäufer", satz: "Der Verkäufer ist freundlich." },
  { nomen: "die Vorfahrt", satz: "Die Vorfahrt ist wichtig." },
  { nomen: "der Vorname", satz: "Der Vorname ist kurz." },
  { nomen: "der Vorschlag", satz: "Der Vorschlag ist gut." },
  { nomen: "der Vorteil", satz: "Der Vorteil ist groß." },
  { nomen: "die Waage", satz: "Die Waage ist genau." },
  { nomen: "das Weihnachten", satz: "Das Weihnachten ist schön." },
  { nomen: "die Weile", satz: "Die Weile ist kurz." },
  { nomen: "das Zimmer", satz: "Das Zimmer ist groß und hell." },
  { nomen: "die Zitrone", satz: "Die Zitrone schmeckt sehr sauer." },
  { nomen: "der Zoo", satz: "Der Zoo hat viele Tiere." }
], 
merkwörter: [
  { word: "die Beere", sentence: "Am Wegesrand entdeckte ich eine rote xxxx." },
  { word: "das Boot", sentence: "Auf dem See schaukelte gemächlich das xxxx." },
  { word: "das Haar", sentence: "Ein einzelnes blondes xxxx lag auf dem Kissen." },
  { word: "die Idee", sentence: "Plötzlich hatte sie eine brillante xxxx." },
  { word: "das Meer", sentence: "Wir machten Urlaub am rauschenden xxxx." },
  { word: "das Moos", sentence: "Der Waldboden war bedeckt von weichem xxxx." },
  { word: "der See", sentence: "Im Sommer baden wir gerne in dem klaren xxxx." },
  { word: "der Tee", sentence: "Zum Frühstück trinke ich immer eine Tasse xxxx." },
  { word: "der Zoo", sentence: "Am Wochenende besuchen wir den xxxx." },
  { word: "ihm", sentence: "Das Geschenk gefiel xxxx sehr gut." },
  { word: "ihn", sentence: "Hast du xxxx gestern im Park gesehen?" },
  { word: "ihr", sentence: "Das neue Kleid stand xxxx ausgezeichnet." },
  { word: "im", sentence: "xxxx Garten blühten bunte Blumen." },
  { word: "in", sentence: "Die Katze versteckte sich xxxx der Kiste." },
  { word: "der Bär", sentence: "Im Wald sahen wir einen großen braunen xxxx." },
  { word: "der Käfer", sentence: "Auf der Blüte krabbelte ein kleiner xxxx." },
  { word: "der Käse", sentence: "Zum Abendbrot aßen wir Brot mit leckerem xxxx." },
  { word: "der Lärm", sentence: "Der xxxx auf der Straße war unerträglich." },
  { word: "das Mädchen", sentence: "Das kleine xxxx spielte im Sandkasten." },
  { word: "der März", sentence: "Im xxxx beginnt der Frühling." },
  { word: "fleißig", sentence: "Die Schülerin arbeitete sehr xxxx an ihrem Projekt." },
  { word: "der Fuß", sentence: "Ich trat barfuß auf den kalten xxxx." },
  { word: "der Gruß", sentence: "Sie schickte uns einen lieben xxxx aus dem Urlaub." },
  { word: "heiß", sentence: "Die Suppe war noch sehr xxxx." },
  { word: "heißen", sentence: "Die Kinder begannen laut xxxx." },
  { word: "der Spaß", sentence: "Wir hatten viel xxxx beim Spielen." },
  { word: "süß", sentence: "Die Erdbeeren schmeckten wunderbar xxxx." },
  { word: "die Vase", sentence: "Auf dem Tisch stand eine xxxx mit bunten Blumen." },
  { word: "vier", sentence: "Wir trafen uns um xxxx Uhr." },
  { word: "der Vogel", sentence: "Ein bunter xxxx sang im Baum." },
  { word: "voll", sentence: "Der Bus war sehr xxxx mit Menschen." },
  { word: "vorbei", sentence: "Die Zeit ging viel zu schnell xxxx." },
  { word: "der Vulkan", sentence: "Der xxxx brach vor langer Zeit aus." },
  { word: "der Verkäufer", sentence: "Der freundliche xxxx beriet uns gut." },
  { word: "der Verkehr", sentence: "Der xxxx auf der Autobahn war stockend." },
  { word: "der Vorname", sentence: "Ihr xxxx ist ungewöhnlich." },
  { word: "das Baby", sentence: "Das kleine xxxx schlief friedlich." },
  { word: "der Clown", sentence: "Der lustige xxxx brachte alle zum Lachen." },
  { word: "die E-Mail", sentence: "Ich habe dir eine xxxx geschickt." },
  { word: "die Pizza", sentence: "Zum Mittagessen bestellen wir eine leckere xxxx." },
  { word: "das Tablet", sentence: "Mit dem xxxx kann man gut im Internet surfen." },
  { word: "der Teddy", sentence: "Das Kind kuschelte mit seinem weichen xxxx." },
  { word: "sechs", sentence: "Wir waren xxxx Freunde, die sich trafen." },
  { word: "zehn", sentence: "In der Gruppe waren genau xxxx Personen." }
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
