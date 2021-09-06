function buildCard(n){
    return "<button class='carte card_down' id='card" + n + "' onClick='cardSelected(" + n + ")'></button>";
}

function displayCard(n){
    let button = document.getElementById('card'+n);
    button.classList.add("card_up");
    button.classList.remove("card_down");
    button.style.backgroundPosition = "-5px " + 100*deck[n] +"px";
}

function resetCard(n){
    let button = document.getElementById('card'+n);
    button.classList.remove("card_up");
    button.classList.add("card_down");
    button.style.backgroundPosition = "";
}

function cardSelected(n){
    console.log("Card selected is deck[" + n + "] = " + deck[n]);
    displayCard(n);

    if (card_selected){
        oneStep();
        console.log("Is it ? deck[" + card_one + "] = " + deck[card_one]);
        if (deck[card_one] === deck[n]){
            pairFound();
            card_selected = false;
        }else{
            alert("Looser")
            resetCard(n);
            resetCard(card_one);
            card_selected = false;
        }
    }else{
        card_one = n;
        card_selected = true    
    }
}

function displayScore(){
    let elt = document.getElementById('score');
    elt.innerHTML = "<h2>Votre score : " + step +" Découverts : " + found + "</h2>";
}

function oneStep(){
    step++;
    displayScore();
}

function pairFound(){
    found++;
    displayScore();
    if (found === max_card/2){
        gameOver();
    }
}

function gameOver(){
    let elt = document.getElementById('plateau');
    elt.innerHTML = '<div id="tudo"><div class="gameover"><p> GAME </p><p> OVER </p></div>' +
                    '<div class="continue"> <p> CONTINUE? </p> </div>' +
                    '<div class="opcoes">' +
                    '<div class="yes"> <a href="index.html"> YES </a> </div>' +
                    '<div class="no"> <a href="score.html"> NO </a> </div></div></div>';    
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createDeck(max){
    //TODO tester max est pair
    deck = [];
    for(let i=0;i<max/2;i++){
        deck[i] = i;
        deck[i + max/2] = i;
    }
    shuffle(deck);
    console.log(deck);
}

let max_card = 2 * 2;
createDeck(max_card);

card_selected = false;

let tmp = "";
let elt = document.getElementById('plateau');

for(let i=0;i<max_card;i++){
    tmp += buildCard(i);
}

elt.innerHTML = tmp;

step = 0;
found = 0;
displayScore();
