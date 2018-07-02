let digits = 1;
let showSeconds = 3;

function randomDigit() {
    return Math.floor(Math.random() * 10);
}

function randomNumberString(digits) {
    const randomNumberStringArray = [];
    for (let i = 0; i < digits; i++) {
        randomNumberStringArray.push(randomDigit().toString());
    }
    return randomNumberStringArray.join('');
}

function startPuzzle(digits, showSeconds) {
    const rns = randomNumberString(digits);
    const randomNumberEl = document.createElement('span');
    randomNumberEl.setAttribute('id', 'random-number');
    randomNumberEl.innerHTML = rns;
    document.body.appendChild(randomNumberEl);
    setTimeout(timeToGuess.bind(null, randomNumberEl, rns), showSeconds*1000); //@todo add visible timer
}

function timeToGuess(randomNumberEl, solutionString) {
    document.body.removeChild(randomNumberEl);
    const input = document.createElement('input');
    input.setAttribute('id', 'guess');
    document.addEventListener('keyup', checkAnswer.bind(null, solutionString, input));
    document.body.appendChild(input);
    input.focus();
}

function checkAnswer(solutionString, input) {
    const guess = document.getElementById('guess').value;
    if (guess === solutionString) {
        correctAnswer(input);
    }
}

function correctAnswer(input) {
    console.log('correct');
    document.body.removeChild(input);
    digits++;
    startPuzzle(digits, showSeconds);
}

window.onload = function() {
    startPuzzle(digits, showSeconds);
};