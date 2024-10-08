
// Initialize sequences and variables
let gameSeq = [];
let userSeq = [];
let buttonColors = ["yellow", "red", "blue", "green"];
let started = false;
let level = 0;
let score = 0; // Initialize score
let h2 = document.querySelector("h2");

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(button) {
    button.classList.add("flash");
    setTimeout(function () {
        button.classList.remove("flash");
    }, 250);
}

function userFlash(button) {
    button.classList.add("flash");
    setTimeout(function () {
        button.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    score++; // Increment score
    h2.innerText = `Level ${level}`; // Only display the level during the game

    let randIdx = Math.floor(Math.random() * buttonColors.length);
    let randColor = buttonColors[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    // Flash the sequence for the current level
    flashSequence();
}

function flashSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i < gameSeq.length) {
            const color = gameSeq[i];
            const button = document.querySelector(`#${color}`);
            gameFlash(button);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 1000); // Flash each button in the sequence with a delay
}

function checkAns() {
    let currentIndex = userSeq.length - 1;
    if (userSeq[currentIndex] === gameSeq[currentIndex]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Show the final score after the game is over
        h2.innerHTML = `Game Over! Your Score: ${score}. Press Any Key to Restart`;
        reset();
    }
}

function btnPress() {
    console.log(this);
    let button = this; // 'this' refers to the button that was clicked
    userFlash(button);

    let userColor = button.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let button of allBtns) {
    button.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;   
    h2.innerHTML = `game over!! score is ${score}` // Reset message
}
