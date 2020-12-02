$(document).ready(function() {

    //Find all elements with the class name .card
    const card = document.querySelectorAll(".card");

    //Set variable for the first and second card click 
    let clickCounter = 0;
    let firstClick;
    let secondClick;
    let cardFlipped = false;
    let freezeGame = false;
    let winCount = 0;
    //cardFlipped set to false as when game starts, no cards are flipped
    //function will set cardFlipped to true
    
    
    randomise();
     
    //Shuffles the cards in a random order
     function randomise() {
        card.forEach(card => {
            let randomNum = Math.floor(Math.random() * 12);
            card.style.order = randomNum;
        });
    }  


    function turnCard() {
        clickCounter += 1;
        if (freezeGame) return;
        if (this === firstClick) return;
        
        $(this).addClass('show-card');
        if(clickCounter == 1){
            seconds = 0;
            
            startTimer();
        }

        

        //If its TRUE that cardFlipped is false, set cardFlipped is true 
        //and set firstClick to this to target card being targeted
        if (!cardFlipped) {
            cardFlipped = true;
            firstClick = this;
        } else {
            //second click
            cardFlipped = false;
            secondClick = this;

            checkCardMatch();
        };
        
    }

    
    $('.card').on('click', turnCard);

    //Lose screen overlay
        


    //Time countdown
    
    let time = 30;
    let timer;
    function startTimer() {
        timer = setInterval(function () {
        time--;

        //Stops timer from going into a minus
        if (time <= 0 ) {
            clearInterval(time = 0) 
            if (winCount < 6) {
                setTimeout(() => {
                    $('#lose-screen').addClass('visible');
                }, 1000);
                
                timer = 0;
            }
        }

        seconds = ("0" + (time % 30)).slice(-2);
        document.querySelector(".timer-hard-game").innerHTML = seconds;
        }, 1000);

        
    }



    
    //Checks to see if firstCLick datasets equals secondClick. Feezes cards if matched, removes .show-card class and turns back if no a match
    function checkCardMatch() {
        let cardsMatched = firstClick.dataset.icon === secondClick.dataset.icon;
        
        if (cardsMatched) {
            freezeCards();
            winCount+=1;
        } else {
            turnCardBack();
        } 
        checkWin();   
    }

    function checkWin() {
        if (winCount == 6) {
            clearInterval(time = 0)
            
            setTimeout(() => {
                $('#win-screen').addClass('visible');
            }, 1500);
            
        }
    }

    //Freezes the cards once turned so they cant turn back on click until another one has been selected (if not a match)
    function freezeCards() {
        $(firstClick).off('click', turnCard);
        $(secondClick).off('click', turnCard);
    }

    //Removes .show-card class and turns card back over
    //Timeout give us time to click second card before first turns over 
    function turnCardBack() {
        freezeGame = true;

        setTimeout(() => {
            $(firstClick).removeClass('show-card');
            $(secondClick).removeClass('show-card');
            
            freezeGame = false
        }, 1000);

    }

    //Resets cards, unfreezes game, no cards flipped, no first or  second card selected. Game starts again. 
    

    //Music
    var playCount = 0;
    var music = document.getElementById('music');
    
    function playPauseMusic() {
        if (playCount == 0) {
            playCount = 1;
            music.play();
        } else {
            playCount = 0;
            music.pause();
            $('#playPause').toggleClass('.music-pause');
        }
        
    }
        
    $('#playPause').on('click', playPauseMusic);

});
