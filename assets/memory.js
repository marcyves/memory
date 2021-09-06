function buildCard(n){
    return "<button class='carte' id='card" + n + "' onClick='card(" + n + ")'></button>";
}

function card(n){
    console.log("deck[" + n + "] = " + deck[n]);
    let card = document.getElementById('card'+n);
    card.innerHTML = "<h1>" + deck[n] + "</h1>";
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

let max_card = 28;
createDeck(max_card);

card_selected = false;

let tmp = "";
let elt = document.getElementById('plateau');

for(let i=0;i<max_card;i++){
    tmp += buildCard(i);
}

elt.innerHTML = tmp;

