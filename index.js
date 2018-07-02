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

function startPuzzle(digits, delaySeconds) {
    const rns = randomNumberString(digits);
    document.getElementById('random-number').innerHTML = rns;
    setTimeout(timeToGuess.bind(null, rns), delaySeconds*1000); //@todo add visible timer
}

function timeToGuess(answer) {
    const input = document.createElement('input');
    input.setAttribute('id', 'guess');
    input.setAttribute('autofocus', true);
    document.addEventListener('keyup', checkAnswer.bind(null, answer));
    document.body.appendChild(input);
}

function checkAnswer(answer) {
    const guess = document.getElementById('guess').value;
    if (guess === answer) {
        console.log('correct');
    }
}

window.onload = function() {
    let digits = 6;
    let delaySeconds = 0;
    startPuzzle(digits, delaySeconds);
};