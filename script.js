const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

const statusText = document.getElementById("status");

// Flash animation
function flash(color) {
    const btn = document.getElementById(color);
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}

// Sound effect
function playSound() {
    new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg").play();
}

// Start next level
function nextLevel() {
    userSequence = [];
    level++;
    statusText.textContent = "Level " + level;

    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);

    flash(randomColor);
    playSound();
}

// Check user input
function checkAnswer(index) {
    if (userSequence[index] === gameSequence[index]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(nextLevel, 700);
        }
    } else {
        statusText.textContent = "Wrong! Game Over.";
        started = false;
        level = 0;
        gameSequence = [];
    }
}

// Start button
document.getElementById("startBtn").addEventListener("click", () => {
    if (!started) {
        started = true;
        gameSequence = [];
        level = 0;
        nextLevel();
    }
});

// Button clicks
colors.forEach(color => {
    document.getElementById(color).addEventListener("click", () => {
        if (!started) return;

        userSequence.push(color);
        flash(color);
        playSound();
        checkAnswer(userSequence.length - 1);
    });
});
