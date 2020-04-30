const helpModal = document.getElementById('helpModal');
function openHelpModal() {
    helpModal.classList.add('show-modal');
}

function closeHelpModal() {
    helpModal.classList.remove('show-modal');
}


let cardElements = document.getElementsByClassName('game-card');
let cardElementsArray = [...cardElements];
let imgElements = document.getElementsByClassName('game-card-img');
let imgElementsArray = [...imgElements];
let starElements = document.getElementsByClassName('star');
let starElementsArray = [...starElements];
let counter = document.getElementById('moveCounter');
let timer = document.getElementById('timer');
let modalElement = document.getElementById('gameOverModal');
let totalGameMovesElement = document.getElementById('totalGameMoves');
let totalGameTimeElement = document.getElementById('totalGameTime');
let finalStarRatingElement = document.getElementById('finalStarRating');
let closeModalIcon = document.getElementById('closeModal');
let openedCards = [];
let matchedCards =  [];
let moves;
let second = 0,
    minute = 0,
    hour = 0,
    interval,
    totalGameTime,
    starRating;

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
    
    let shuffledImages = shuffle(imgElementsArray);


    for(i=0; i<shuffledImages.length; i++) {
        
        cardElements[i].innerHTML = "";

       
        cardElements[i].appendChild(shuffledImages[i]);
        cardElements[i].type = `${shuffledImages[i].alt}`;

       
        cardElements[i].classList.remove("show", "open", "match", "disabled");
        cardElements[i].children[0].classList.remove("show-img");
    }

    
    for(let i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].addEventListener("click", displayCard)
    }

    
    flashCards();

   
    moves = 0;
    counter.innerText = `Adım ${moves} `;

  
    for(let i=0; i<starElementsArray.length; i++) {
        starElementsArray[i].style.opacity = 1000;
    }

    
    timer.innerHTML = 'Saniye 0';
    clearInterval(interval);
}

function flashCards() {
    for(i=0; i<cardElements.length; i++) {
        cardElements[i].children[0].classList.add("show-img")
    }
    setTimeout(function(){
        for(i=0; i<cardElements.length; i++) {
            cardElements[i].children[0].classList.remove("show-img")
        }
    }, 1000)
}

function displayCard() {
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    cardOpen(this);
}

function cardOpen(card) {
    openedCards.push(card);
    let len = openedCards.length;
    if(len === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    openedCards = [];
    if(matchedCards.length == 16) {
        endGame();
    }
}

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        openedCards[0].children[0].classList.remove('show-img');
        openedCards[1].children[0].classList.remove('show-img');
        enable();
        openedCards = [];
        
    }, 1100)
}


function disable() {
    cardElementsArray.filter((card, i, cardElementsArray) => {
        card.classList.add('disabled');
    })
}

function enable() {
    cardElementsArray.filter((card, i, cardElementsArray) => {
        card.classList.remove('disabled');
        for(let i=0; i<matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        }
    })
}

function moveCounter() {
    moves++;
    counter.innerHTML = `Adım ${moves} `;

    if(moves == 1) {
        sn = 0;
        dk = 0;
        saat = 0;
        startTimer();
    }

    
}

function startTimer() {
    interval = setInterval(function(){
        timer.innerHTML = `Saniye ${sn} `;
        sn++;
        if(sn == 60) {
            dk++;
            sn = 0;
        }
        if(dk == 60) {
            saat++;
            dk = 0;
        }
    }, 1000)
}

function endGame() {
    clearInterval(interval);
    totalGameTime = timer.innerHTML;
    starRating = document.querySelector('.rating').innerHTML;

  
    modalElement.classList.add("show-modal");
   
    totalGameTimeElement.innerHTML = totalGameTime;
    totalGameMovesElement.innerHTML = moves;
    finalStarRatingElement.innerHTML = starRating;

    matchedCards = [];
    closeModal();
}

function closeModal() {
    closeModalIcon.addEventListener("click", function() {
        modalElement.classList.remove("show-modal");
        startGame();
    })
}


  
window.onload = function () {
    setTimeout(function() {
        startGame()
    }, 1200);
}