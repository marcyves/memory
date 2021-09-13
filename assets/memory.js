/**
 * Classe Memory qui gère le jeu
 * -----------------------------
 * 
 * (c) Marc Augier
 */
class Memory {

    constructor(){
        /**
         * Le constructeur est appelé quand on instancie la classe au chargement 
         * du document qui peut afficher 2 pages différentes
         */
         this.deck = [];
         this.selected = [];

        if(window.location.search === ""){
            // Page du jeu
            let demo_deck = 18;
            this.max_card = 0;
    
            // Build and display welcome screen
            var mydata = JSON.parse(jsn_msg);
            displayMessage(mydata[0].welcome, 'message');
            displayMessage(mydata[0].menu + "il y a "+demo_deck+" cartes en jeu au total.</p>", 'titre');
            // Création d'un deck de demo (1 seule carte de chaque)
            this.createDemoDeck(demo_deck);      
            this.displayBoard(demo_deck);
            // Affiche toutes les cartes      
            for(let i=0;i<demo_deck;i++){
                this.displayCard(i);
            }
        }else if (window.location.search === "?score"){
            // Page des scores
            displayMessage("<h1>Hall of Fame</h1>", 'message')
            displayMessage("<h2>Les grands noms du memory</h2>", 'titre');
            this.displayHallOfFame();
        }
    }

    start(cards){

        this.card_selected = false;
        this.pair_not_found = false;
        this.max_card = cards * 2;
        this.step     = 0;
        this.found    = 0;
        this.progress = 0;
        
        this.createDeck();      
        this.displayBoard(this.max_card);       
        this.displayScore();

    }

    GetNotFound(){
        return this.pair_not_found;
    }

    SetNotFound(b){
        this.pair_not_found = b;
    }

    createDemoDeck(n){
        this.deck.length = 0;

        for(let i=0;i<n;i++){
            this.deck[i] = i;
        }
    }

    createDeck(){
        this.deck = [];
        this.deck.length = 0;

        for(let i=0;i<this.max_card/2;i++){
            this.deck[i] = i;
            this.deck[i + this.max_card/2] = i;
            this.selected[i] = false;
        }
        shuffle(this.deck);
        console.log("Le paquet de " + this.max_card + " cartes en jeu: " + this.deck);
    }

    displayHallOfFame(){

        fetch("http://127.0.0.1:8000/score")
        .then(ListeScore => ListeScore.json())
        .then(scores =>{
            let AfficheScore = "<ul>";
            for(let score of scores){
                AfficheScore += `<li>${score.name} : ${score.score}</li>`;
            }
            AfficheScore += "</ul>";
            document.getElementById('plateau').innerHTML = AfficheScore;
        });

    }

    displayScore(){
        let ortho = "";
        if (this.found>1){
            ortho = "s";
        }
        displayMessage("<h2>Vous avez découvert " + this.found + " paire" + ortho + " en " + this.step + " étapes</h2>", 'titre');
    }
    
    displayBoard(n){
        let tmp = "";
        let elt = document.getElementById('plateau');
        for(let i=0;i<n;i++){
            tmp += this.buildCard(i);
        }
        
        elt.innerHTML = tmp;
    }

    buildCard(n){
        return "<button class='carte card_down' id='card" + n + "' onClick='cardSelected(" + n + ")'></button>";
    }

    displayCard(n){
        if (this.selected[n]){
            return false;
        }else{
            let button = document.getElementById('card'+n);
            button.classList.add("card_up");
            button.classList.remove("card_down");
            button.style.backgroundPosition = "-5px " + 100*this.deck[n] +"px";
            return true;
        }
    }

    resetCard(n){
        let button = document.getElementById('card'+n);
        button.classList.remove("card_up");
        button.classList.add("card_down");
        button.style.backgroundPosition = "";
    }

    oneStep(){
        this.step++;
        this.displayScore();
    }

    pairFound(){
        this.found++;
        this.displayScore();
        this.card_selected = false;

        if (this.found === this.max_card/2){
            // Save score
            const data ={ name: 'marc', score: '01:02:03'};

            fetch('http://127.0.0.1:8000/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'no-cors',
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Score ajouté: ', data);
            })
            .catch((error) => {
                console.error('Erreur enregistrement score: ', error);
            });
            // Display game over message
            displayMessage('<div id="tudo"><div class="gameover"><p> GAME </p><p> OVER </p></div></div>', 'plateau');    
        }
    }
}

/**
 * Fonctions Utilitaires
 */

 /** 
 *  Shuffle 
 *  Mélange un array, utilisée pour "battre les cartes"
 * @param {*} array 
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * DisplayMessage
 * 
 * @param {*} n 
 */
function displayMessage(m, type){
    document.getElementById(type).innerHTML = m;
}


/**
 * Fonction qui gère le déroulement du jeu
 * Elle est appelée à chaque click sur une carte
 * @param {*} n 
 */
function cardSelected(n){
    if(game.max_card === 0){
        // Le jeu n'a pas démarré
        game.start(n+1);
    }else{
        // Le jeu est en route
        game.displayCard(n);

        if (game.card_selected){
            // Une carte a déjà été choisie
            if (game.GetNotFound()){
                // La deuxième carte était différente
                game.resetCard(card_one);
                game.resetCard(card_two);
                game.SetNotFound(false);
                game.card_selected = false;
                game.displayScore();
            }else{
                // On a sélectionné une deuxième carte
                game.oneStep();
                if (game.deck[card_one] === game.deck[n]){
                    // Une paire est trouvée
                    game.selected[card_one] = true;
                    game.selected[n] =true;
                    game.pairFound();
                }else{
                    // La deuxième carte est différente
                    displayMessage("<h4>Raté</h4>", "titre");
                    game.SetNotFound(true);
                    card_two = n;
                }
            }
        }else{
            //première carte de la paire
            card_one = n;
            game.card_selected = true;
        }    
    }
}

/**
 * Lancement du jeu par instanciation de la classe Memory
 */

const game = new Memory();

/**
 * Progress bar
 
const progressbar = document.querySelector(".progress");
let progress = 0;

const changeProgress = () => {
    progress += 100;
    progressbar.style.width = `${this.progress}%`;
};

/* change progress after 1 second 
var myVar = setInterval(changeProgress, 5000);
 */
