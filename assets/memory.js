class Memory {

    constructor(){

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

    displayScore(){
        this.displayMessage("<h2>Votre score : " + this.step +" Découverts : " + this.found + "</h2>", 'titre');
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
            this.gameOver();
        }
    }

    gameOver(){
        let elt = document.getElementById('plateau');
        elt.innerHTML = '<div id="tudo"><div class="gameover"><p> GAME </p><p> OVER </p></div>' +
                        '<div class="continue"> <p> CONTINUE? </p> </div>' +
                        '<div class="opcoes">' +
                        '<div class="yes"> <a href="index.html"> YES </a> </div>' +
                        '<div class="no"> <a href="score.html"> NO </a> </div></div></div>';    
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

