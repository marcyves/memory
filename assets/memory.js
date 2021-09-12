class Memory {

    constructor(){

        if(window.location.search === ""){
            let demo_deck = 18;
            this.max_card = 0;
    
            // Build and display welcome screen
            var mydata = JSON.parse(jsn_msg);
            this.displayMessage(mydata[0].welcome, 'message');
            this.displayMessage(mydata[0].menu + "il y a "+demo_deck+" cartes en jeu au total.</p>", 'titre');
    
    
            this.createDemoDeck(demo_deck);      
            this.displayBoard(demo_deck);       
            for(let i=0;i<demo_deck;i++){
                this.displayCard(i);
            }
        }else if (window.location.search === "?score"){
            this.displayMessage("<h1>Hall of Fame</h1>", 'message')
            this.displayMessage("<h2>Les grands noms du memory</h2>", 'titre');
            this.displayHallOfFame();
        }
    
    }

    start(cards){

        this.max_card = cards * 2;
        this.card_selected = false;
        this.step = 0;
        this.found = 0;
        
        this.createDeck();      
        this.displayBoard(this.max_card);       
        this.displayScore();
    }
       
    createDemoDeck(n){
        this.deck = [];
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
        }
        shuffle(this.deck);
        console.log("Le paquet de " + this.max_card + " cartes en jeu: " + this.deck);
    }

    displayMessage(m, type){
        let elt = document.getElementById(type);
        elt.innerHTML = m;
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
        this.displayMessage("<h2>Vous avez découvert " + this.found + " paire" + ortho + " en " + this.step + " étapes</h2>", 'titre');
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
        let button = document.getElementById('card'+n);
        button.classList.add("card_up");
        button.classList.remove("card_down");
        button.style.backgroundPosition = "-5px " + 100*this.deck[n] +"px";
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
            // Dsiplay game over message
            document.getElementById('plateau').innerHTML = '<div id="tudo"><div class="gameover"><p> GAME </p><p> OVER </p></div></div>';    
        }
    }

}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function cardSelected(n){
    if(game.max_card === 0){
        // Le jeu n'a pas démarré
        game.start(n+1);
    }else{
        // Le jeu est en route
        game.displayCard(n);

        if (game.card_selected){
            game.oneStep();
            if (game.deck[card_one] === game.deck[n]){
                game.pairFound();
                game.card_selected = false;
            }else{
                alert("Looser")
                game.resetCard(n);
                game.resetCard(card_one);
                game.card_selected = false;
            }
        }else{
            card_one = n;
            game.card_selected = true;
        }    
    }
}

const game = new Memory();

