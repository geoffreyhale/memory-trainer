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

        const startNumber = function() {
            _numberString = randomNumberString(_digitCount);

            _numberStringEl = document.createElement('span');
            _numberStringEl.setAttribute('id', 'random-number');
            _numberStringEl.innerHTML = _numberString;
            document.body.appendChild(_numberStringEl);
        };

        const timeToGuess = function() {
            document.body.removeChild(_numberStringEl);

            _userInputEl = document.createElement('input');
            _userInputEl.setAttribute('id', 'guess');
            document.body.appendChild(_userInputEl);

            _userInputEl.focus();
        };

        this.start = function() {
            startNumber();
            setTimeout(timeToGuess, _secondsVisible*1000); //@todo add visible timer
        };

        this.solved = function() {
            if (_userInputEl && _userInputEl.value === _numberString) {
                console.log('correct - ' + _numberString);
                document.body.removeChild(_userInputEl);
                return true;
            }
            return false;
        };
    }
}

class Game {
    constructor(gameEl) {
        let _digitCount = 1;
        let _secondsVisible = 3;
        let _puzzle = null;

        const _gameEl = gameEl;
        let _digitCountEl = null;
        
        const _createDigitCountEl = function() {
            _digitCountEl = document.createElement('h2');
            _gameEl.appendChild(_digitCountEl);
        };

        const _startNextPuzzle = function() {
            _digitCountEl.innerText = "Level " + _digitCount;
            _puzzle = new Puzzle(_digitCount, _secondsVisible);
            _puzzle.start();
        };

        this.start = function() {
            _createDigitCountEl();
            _startNextPuzzle();

            document.addEventListener('keyup', function() {
                if (_puzzle.solved()) {
                    _digitCount++;
                    _startNextPuzzle();
                }
            });
        };
    }
}

window.onload = function() {
    const gameEl = document.getElementById('game');
    if (gameEl) {
        const game = new Game(gameEl);
        game.start();
    }
};