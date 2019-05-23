// Cache the DOM
const lhCard = document.querySelector(".left_hand_card");
const rhCard = document.querySelector(".right_hand_card");
const lhButton = document.querySelector(".left_hand_button");
const rhButton = document.querySelector(".right_hand_button");
const lhDiv = document.querySelector('.left_hand_div');
const rhDiv = document.querySelector('.right_hand_div');
const playAgainBtn = document.querySelector('.play_again');
let gamePlaying = true;

// Player 1 Object
const player1 = {
    currentScoreHTML: document.querySelector(".lh_current_score"),
    totalScoreHTML: document.querySelector(".lh_total_score"),
    currentScore: 0,
    totalScore: 0
}

// Player 2 Object
const player2 = {
    currentScoreHTML: document.querySelector(".rh_current_score"),
    totalScoreHTML: document.querySelector(".rh_total_score"),
    currentScore: 0,
    totalScore: 0
}

// Actions UI when player clicks 'win' button
document.addEventListener('click', function (e) {
    if (gamePlaying) {
        if (e.target.classList.contains('win_button')) {
            const previousButton = e.target.parentNode.parentNode.parentNode.children[0];
            const winAlert = document.createElement('div')
            winAlert.classList.add("alert", "alert-info");

            if (e.target.classList.contains('lh_win_button')) {
                if (player1.totalScore > 50) {
                    winAlert.textContent = "Player 1 Wins!";
                    gamePlaying = false;
                } else {
                    winAlert.textContent = "You haven't got 50 yet!";
                }
            } else {
                if (player2.totalScore > 50) {
                    winAlert.textContent = "Player 2 Wins!";
                    gamePlaying = false;
                } else {
                    winAlert.textContent = "You haven't got 50 yet!";
                }
            }

            previousButton.insertAdjacentElement('afterend', winAlert)
            setTimeout(() => winAlert.remove(), 1000);

            lhCard.removeEventListener('click', (event) => inputtedOnScreen(event, player1));
            e.preventDefault();
        }
    }
});

// Edit UI to show relevant choice
const inputtedOnScreen = (e, player) => {

    if (gamePlaying) {
        const randomCardReturn = randomCard();
        e.target.src =
            `/images/Playing_Cards/${randomCardReturn.card}.png`
        if (randomCardReturn.playOn) {
            player.currentScore += randomCardReturn.points;
            player.currentScoreHTML.textContent = `Current Score: ${player.currentScore}`
        } else {
            player.currentScore = 0;
            player.currentScoreHTML.textContent = `Current Score: 0`
            changeActivePlayer();
        }
        e.preventDefault;
    }
};

// Change Active Player if Current Player loses
const changePlayer = (e, player) => {
    if (gamePlaying) {
        player.totalScore = player.totalScore + player.currentScore
        player.totalScoreHTML.textContent = `Total Score: ${player.totalScore}`
        changeActivePlayer();
        player.currentScore = 0;
        player.currentScoreHTML.textContent = `Current Score: 0`;
    }
}

// Remove/Add border
const changeActivePlayer = () => {
    lhDiv.classList.toggle('active');
    rhDiv.classList.toggle('active');
}

// Generate random number and return object
const randomCard = () => {
    let randNumber = Math.ceil((Math.random() * 13));
    let card;

    switch (randNumber) {
        case 1:
            card = "AC";
            points = 1;
            playOn = true;
            break;
        case 2:
            card = "2C";
            points = 2;
            playOn = true;
            break;
        case 3:
            card = "3C";
            points = 3;
            playOn = true;
            break;
        case 4:
            card = "4C";
            points = 4;
            playOn = true;
            break;
        case 5:
            card = "5C";
            points = 5;
            playOn = true;
            break;
        case 6:
            card = "6C";
            points = 6;
            playOn = true;
            break;
        case 7:
            card = "7C";
            points = 7;
            playOn = true;
            break
        case 8:
            card = "8C";
            points = 8;
            playOn = true;
            break;
        case 9:
            card = "9C";
            points = 9;
            playOn = true;
            break;
        case 10:
            card = "10C";
            points = 10;
            playOn = true;
            break;
        case 11:
            card = "JC";
            playOn = false;
            points;
            break;
        case 12:
            card = "QC";
            playOn = false;
            points;
            break;
        case 13:
            card = "KC";
            playOn = false;
            points;
            break;
    }
    return {
        card: card,
        points: points,
        playOn: playOn
    };
};

// Play Again UI Button
const playAgain = () => {
    player1.currentScoreHTML.textContent = `Current Score: 0`
    player1.totalScoreHTML.textContent = `Total Score: 0`
    player1.currentScore = 0
    player1.totalScore = 0;
    player2.currentScoreHTML.textContent = `Current Score: 0`
    player2.totalScoreHTML.textContent = `Total Score: 0`
    player2.currentScore = 0
    player2.totalScore = 0;
    if (rhDiv.classList.contains('active')) {
        changeActivePlayer();
    }
    gamePlaying = true;
};

playAgainBtn.addEventListener('click', playAgain);

// Initialize app
const init = () => {
    lhCard.addEventListener("click", (event) => inputtedOnScreen(event, player1));
    rhCard.addEventListener("click", (event) => inputtedOnScreen(event, player2));
    lhButton.addEventListener('click', (event) => changePlayer(event, player1));
    rhButton.addEventListener('click', (event) => changePlayer(event, player2));
}

window.addEventListener('load', init);