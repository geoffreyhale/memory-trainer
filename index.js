function randomDigit() {
    return Math.floor(Math.random() * 10);
}

function randomNumberString(digitCount) {
    const randomNumberStringArray = [];
    for (let i = 0; i < digitCount; i++) {
        randomNumberStringArray.push(randomDigit().toString());
    }
    return randomNumberStringArray.join('');
}

class Puzzle {
    constructor(digitCount, secondsVisible) {
        const _digitCount = digitCount;
        const _secondsVisible = secondsVisible;

        let _numberString = '';
        let _numberStringEl = null;
        let _userInputEl = null;

        this.start = function() {
            _numberString = randomNumberString(_digitCount);

            _numberStringEl = document.createElement('span');
            _numberStringEl.setAttribute('id', 'random-number');
            _numberStringEl.innerHTML = _numberString;
            document.body.appendChild(_numberStringEl);
            
            setTimeout(this.timeToGuess, _secondsVisible*1000); //@todo add visible timer
        };

        this.timeToGuess = function() {
            document.body.removeChild(_numberStringEl);

            _userInputEl = document.createElement('input');
            _userInputEl.setAttribute('id', 'guess');
            document.body.appendChild(_userInputEl);

            _userInputEl.focus();
        };

        this.solved = function() {
            if (_userInputEl && _userInputEl.value === _numberString) {
                console.log('correct');
                document.body.removeChild(_userInputEl);
                return true;
            }
            return false;
        };
    }
}

function startGame() {
    let digitCount = 1;
    let secondsVisible = 3;

    let puzzle = new Puzzle(digitCount, secondsVisible);
    puzzle.start();

    document.addEventListener('keyup', function() {
        if (puzzle.solved()) {
            digitCount++;
            puzzle = new Puzzle(digitCount, secondsVisible);
            puzzle.start();
        }
    });
}

window.onload = function() {
    startGame();
};