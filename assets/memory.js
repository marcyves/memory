class Memory {
    constructor(cards){
        this.max_card = cards * 2;
        this.card_selected = false;
        this.step = 0;
        this.found = 0;
        this.deck = [];

        this.createDeck(this.max_card);      
        this.displayBoard();       
        this.displayScore();
    }
       
    createDeck(max){
        //TODO tester max est pair
        for(let i=0;i<max/2;i++){
            this.deck[i] = i;
            this.deck[i + max/2] = i;
        }
        shuffle(this.deck);
        console.log(this.deck);
    }

    displayScore(){
        let elt = document.getElementById('score');
        elt.innerHTML = "<h2>Votre score : " + this.step +" Découverts : " + this.found + "</h2>";
    }
    
    displayBoard(){
        let tmp = "";
        let elt = document.getElementById('plateau');
        for(let i=0;i<this.max_card;i++){
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

const game = new Memory(2);

