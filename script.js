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
  { word: 'der Abend', sentence: 'Der Abend war sehr schön.' },
  { word: 'der Affe', sentence: 'Der Affe im Zoo ist sehr lustig.' },
  { word: 'die Angst', sentence: 'Ich habe Angst vor Spinnen.' },
  { word: 'der Apfel', sentence: 'Der Apfel schmeckt süß.' },
  { word: 'der Arzt', sentence: 'Der Arzt hat mir ein Rezept verschrieben.' },
  { word: 'das Auge', sentence: 'Das Auge tränt.' },
  { word: 'die Banane', sentence: 'Die Banane ist gelb.' },
  { word: 'das Beispiel', sentence: 'Das Beispiel ist sehr hilfreich.' },
  { word: 'der Berg', sentence: 'Der Berg ist hoch.' },
  { word: 'die Birne', sentence: 'Die Birne ist saftig.' },
  { word: 'der Brief', sentence: 'Der Brief ist angekommen.' },
  { word: 'der Bruder', sentence: 'Der Bruder hilft mir oft.' },
  { word: 'das Buch', sentence: 'Das Buch ist spannend.' },
  { word: 'die Burg', sentence: 'Die Burg ist alt.' },
  { word: 'der Cent', sentence: 'Der Cent ist eine kleine Münze.' },
  { word: 'der Chor', sentence: 'Der Chor singt schön.' },
  { word: 'das Fahrrad', sentence: 'Das Fahrrad ist kaputt.' },
  { word: 'die Ferien', sentence: 'Die Ferien sind bald vorbei.' },
  { word: 'der Fernseher', sentence: 'Der Fernseher ist groß.' },
  { word: 'die Flasche', sentence: 'Die Flasche ist leer.' },
  { word: 'das Flugzeug', sentence: 'Das Flugzeug fliegt hoch.' },
  { word: 'der Freitag', sentence: 'Der Freitag ist mein Lieblingstag.' },
  { word: 'das Frühstück', sentence: 'Das Frühstück ist lecker.' },
  { word: 'der Freund', sentence: 'Der Freund ist lustig.' },
  { word: 'der Fuchs', sentence: 'Der Fuchs ist schlau.' },
  { word: 'die Gabel', sentence: 'Die Gabel ist aus Metall.' },
  { word: 'die Geburt', sentence: 'Die Geburt ist ein besonderes Ereignis.' },
  { word: 'die Geschichte', sentence: 'Die Geschichte ist spannend.' },
  { word: 'das Gewitter', sentence: 'Das Gewitter ist laut.' },
  { word: 'die Giraffe', sentence: 'Die Giraffe ist groß.' },
  { word: 'das Glück', sentence: 'Das Glück ist mit mir.' },
  { word: 'die Gruppe', sentence: 'Die Gruppe ist groß.' },
  { word: 'das Handy', sentence: 'Das Handy ist neu.' },
  { word: 'das Heft', sentence: 'Das Heft ist voll.' },
  { word: 'die Hexe', sentence: 'Die Hexe ist böse.' },
  { word: 'die Hose', sentence: 'Die Hose ist blau.' },
  { word: 'die Idee', sentence: 'Die Idee ist gut.' },
  { word: 'die Jacke', sentence: 'Die Jacke ist warm.' },
  { word: 'der Junge', sentence: 'Der Junge spielt Fußball.' },
  { word: 'die Karte', sentence: 'Die Karte ist bunt.' },
  { word: 'der Käse', sentence: 'Der Käse schmeckt gut.' },
  { word: 'die Kirche', sentence: 'Die Kirche ist alt.' },
  { word: 'die Kirsche', sentence: 'Die Kirsche ist rot.' },
  { word: 'der Knopf', sentence: 'Der Knopf ist rund.' },
  { word: 'der Korb', sentence: 'Der Korb ist voll.' },
  { word: 'das Kreuz', sentence: 'Das Kreuz ist ein Symbol.' },
  { word: 'die Küche', sentence: 'Die Küche ist sauber.' },
  { word: 'das Laub', sentence: 'Das Laub ist bunt.' },
  { word: 'der Lehrer', sentence: 'Der Lehrer erklärt den Stoff.' },
  { word: 'der Löffel', sentence: 'Der Löffel ist aus Silber.' },
  { word: 'der Löwe', sentence: 'Der Löwe brüllt laut.' },
  { word: 'die Mappe', sentence: 'Die Mappe ist voll mit Blättern.' },
  { word: 'das Messer', sentence: 'Das Messer ist scharf.' },
  { word: 'die Minute', sentence: 'Die Minute ist kurz.' },
  { word: 'der Mittag', sentence: 'Der Mittag ist heiß.' },
  { word: 'der Montag', sentence: 'Der Montag ist der erste Tag der Woche.' },
  { word: 'die Mütze', sentence: 'Die Mütze ist warm.' },
  { word: 'der Nachbar', sentence: 'Der Nachbar ist freundlich.' },
  { word: 'der Nachmittag', sentence: 'Der Nachmittag ist schön.' },
  { word: 'die Nähe', sentence: 'Die Nähe zum Meer ist toll.' },
  { word: 'das Nashorn', sentence: 'Das Nashorn ist stark.' },
  { word: 'die Note', sentence: 'Die Note ist gut.' },
  { word: 'der Papagei', sentence: 'Der Papagei spricht.' },
  { word: 'die Pappe', sentence: 'Die Pappe ist dünn.' },
  { word: 'die Pflanze', sentence: 'Die Pflanze ist grün.' },
  { word: 'das Pflaster', sentence: 'Das Pflaster ist auf der Wunde.' },
  { word: 'der Pinsel', sentence: 'Der Pinsel ist nass.' },
  { word: 'der Pullover', sentence: 'Der Pullover ist warm.' },
  { word: 'der Rauch', sentence: 'Der Rauch ist schwarz.' },
  { word: 'die Rettung', sentence: 'Die Rettung kam schnell.' },
  { word: 'der Samstag', sentence: 'Der Samstag ist ein schöner Tag.' },
  { word: 'der Schal', sentence: 'Der Schal ist warm.' },
  { word: 'die Schaufel', sentence: 'Die Schaufel ist groß.' },
  { word: 'die Schaukel', sentence: 'Die Schaukel ist lustig.' },
  { word: 'das Schiff', sentence: 'Das Schiff ist groß.' },
  { word: 'das Schloss', sentence: 'Das Schloss ist alt.' },
  { word: 'der Schluss', sentence: 'Der Schluss ist gut.' },
  { word: 'der Spiegel', sentence: 'Der Spiegel ist sauber.' },
  { word: 'die Spinne', sentence: 'Die Spinne krabbelt.' },
  { word: 'der Sport', sentence: 'Der Sport ist gesund.' },
  { word: 'die Stadt', sentence: 'Die Stadt ist groß.' },
  { word: 'der Stein', sentence: 'Der Stein ist hart.' },
  { word: 'die Straße', sentence: 'Die Straße ist lang.' },
  { word: 'das Stück', sentence: 'Das Stück ist klein.' },
  { word: 'die Stunde', sentence: 'Die Stunde ist kurz.' },
  { word: 'die Tafel', sentence: 'Die Tafel ist schwarz.' },
  { word: 'die Tasche', sentence: 'Die Tasche ist voll.' },
  { word: 'der Teller', sentence: 'Der Teller ist leer.' },
  { word: 'der Tipp', sentence: 'Der Tipp ist gut.' },
  { word: 'der Tisch', sentence: 'Der Tisch ist groß.' },
  { word: 'die Treppe', sentence: 'Die Treppe ist lang.' },
  { word: 'der Uhu', sentence: 'Der Uhu ist nachtaktiv.' },
  { word: 'der Urlaub', sentence: 'Der Urlaub ist schön.' },
  { word: 'der Vampir', sentence: 'Der Vampir ist blass.' },
  { word: 'der Verkäufer', sentence: 'Der Verkäufer ist freundlich.' },
  { word: 'die Vorfahrt', sentence: 'Die Vorfahrt ist wichtig.' },
  { word: 'der Vorname', sentence: 'Der Vorname ist kurz.' },
  { word: 'der Vorschlag', sentence: 'Der Vorschlag ist gut.' },
  { word: 'der Vorteil', sentence: 'Der Vorteil ist groß.' },
  { word: 'die Waage', sentence: 'Die Waage ist genau.' },
  { word: 'das Weihnachten', sentence: 'Das Weihnachten ist schön.' },
  { word: 'die Weile', sentence: 'Die Weile ist kurz.' },
  { word: 'das Zimmer', sentence: 'Das Zimmer ist groß und hell.' },
  { word: 'die Zitrone', sentence: 'Die Zitrone schmeckt sehr sauer.' },
  { word: 'der Zoo', sentence: 'Der Zoo hat viele Tiere.' }
], 
merkwörter: [
  { word: 'die Beere', sentence: 'Am Wegesrand entdeckte ich eine rote xxxx.' },
  { word: 'das Boot', sentence: 'Auf dem See schaukelte gemächlich das xxxx.' },
  { word: 'das Haar', sentence: 'Ein einzelnes blondes xxxx lag auf dem Kissen.' },
  { word: 'die Idee', sentence: 'Plötzlich hatte sie eine brillante xxxx.' },
  { word: 'das Meer', sentence: 'Wir machten Urlaub am rauschenden xxxx.' },
  { word: 'das Moos', sentence: 'Der Waldboden war bedeckt von weichem xxxx.' },
  { word: 'der See', sentence: 'Im Sommer baden wir gerne in dem klaren xxxx.' },
  { word: 'der Tee', sentence: 'Zum Frühstück trinke ich immer eine Tasse xxxx.' },
  { word: 'der Zoo', sentence: 'Am Wochenende besuchen wir den xxxx.' },
  { word: 'ihm', sentence: 'Das Geschenk gefiel xxxx sehr gut.' },
  { word: 'ihn', sentence: 'Hast du xxxx gestern im Park gesehen?' },
  { word: 'ihr', sentence: 'Das neue Kleid stand xxxx ausgezeichnet.' },
  { word: 'im', sentence: 'xxxx Garten blühten bunte Blumen.' },
  { word: 'in', sentence: 'Die Katze versteckte sich xxxx der Kiste.' },
  { word: 'der Bär', sentence: 'Im Wald sahen wir einen großen braunen xxxx.' },
  { word: 'der Käfer', sentence: 'Auf der Blüte krabbelte ein kleiner xxxx.' },
  { word: 'der Käse', sentence: 'Zum Abendbrot aßen wir Brot mit leckerem xxxx.' },
  { word: 'der Lärm', sentence: 'Der xxxx auf der Straße war unerträglich.' },
  { word: 'das Mädchen', sentence: 'Das kleine xxxx spielte im Sandkasten.' },
  { word: 'der März', sentence: 'Im xxxx beginnt der Frühling.' },
  { word: 'fleißig', sentence: 'Die Schülerin arbeitete sehr xxxx an ihrem Projekt.' },
  { word: 'der Fuß', sentence: 'Ich trat barfuß auf den kalten xxxx.' },
  { word: 'der Gruß', sentence: 'Sie schickte uns einen lieben xxxx aus dem Urlaub.' },
  { word: 'heiß', sentence: 'Die Suppe war noch sehr xxxx.' },
  { word: 'heißen', sentence: 'Die Kinder begannen laut xxxx.' },
  { word: 'der Spaß', sentence: 'Wir hatten viel xxxx beim Spielen.' },
  { word: 'süß', sentence: 'Die Erdbeeren schmeckten wunderbar xxxx.' },
  { word: 'die Vase', sentence: 'Auf dem Tisch stand eine xxxx mit bunten Blumen.' },
  { word: 'vier', sentence: 'Wir trafen uns um xxxx Uhr.' },
  { word: 'der Vogel', sentence: 'Ein bunter xxxx sang im Baum.' },
  { word: 'voll', sentence: 'Der Bus war sehr xxxx mit Menschen.' },
  { word: 'vorbei', sentence: 'Die Zeit ging viel zu schnell xxxx.' },
  { word: 'der Vulkan', sentence: 'Der xxxx brach vor langer Zeit aus.' },
  { word: 'der Verkäufer', sentence: 'Der freundliche xxxx beriet uns gut.' },
  { word: 'der Verkehr', sentence: 'Der xxxx auf der Autobahn war stockend.' },
  { word: 'der Vorname', sentence: 'Ihr xxxx ist ungewöhnlich.' },
  { word: 'das Baby', sentence: 'Das kleine xxxx schlief friedlich.' },
  { word: 'der Clown', sentence: 'Der lustige xxxx brachte alle zum Lachen.' },
  { word: 'die E-Mail', sentence: 'Ich habe dir eine xxxx geschickt.' },
  { word: 'die Pizza', sentence: 'Zum Mittagessen bestellen wir eine leckere xxxx.' },
  { word: 'das Tablet', sentence: 'Mit dem xxxx kann man gut im Internet surfen.' },
  { word: 'der Teddy', sentence: 'Das Kind kuschelte mit seinem weichen xxxx.' },
  { word: 'sechs', sentence: 'Wir waren xxxx Freunde, die sich trafen.' },
  { word: 'zehn', sentence: 'In der Gruppe waren genau xxxx Personen.' }
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
