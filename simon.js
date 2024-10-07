
// Initialize sequences and variables
let gameSeq = [];
let userSeq = [];

// Corrected button colors
let buttonColors = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;
let score = 0;
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
    score++;
    h2.innerText = `Level ${level}`; // Corrected template literal

    let randIdx = Math.floor(Math.random() * buttonColors.length);
    let randColor = buttonColors[randIdx];
    let randBtn = document.querySelector(`#${randColor}`); // Corrected query selector
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
    let currentIndex = userSeq.length -1;
    if (userSeq[currentIndex] === gameSeq[currentIndex]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = "Game Over, Press Any Key to Restart";
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
    score = 0;
    h2.innerHTML = `Game over !! Press any key to Start again` ;
    document .querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },150);
    reset();
}    

