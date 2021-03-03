let totalLives = 5
let pressedButtons = []

class Game {

    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases()
        this.activePhrase = null;
    }

    getRandomPhrase() {
        let randomNumber = Math.floor(Math.random() * data.length)
        return data[randomNumber]
    }

    createPhrases() {
        let phares = []
        for (let i = 0; i < data.length; i++) {
            let phrase = new Phrase(data[i])
            phares.push(phrase)
        }
        return phares
    }

    handleKeyboard(keyName, bool, stage, button) {
        const qwertyKeys = document.getElementsByTagName('button')
        for (let i = 0; i < qwertyKeys.length; i++) {
            if (stage == 'start') {
                qwertyKeys[i].className = keyName
                qwertyKeys[i].disabled = bool
                qwertyKeys[i].removeAttribute('style')
            } else {
                if (qwertyKeys[i].textContent == button) {
                    qwertyKeys[i].disabled = bool
                    qwertyKeys[i].className = keyName
                    qwertyKeys[i].setAttribute('style', 'cursor:not-allowed')
                }
            }
        }
    }

    startGame() { // resetting the app---------
        const ul = document.getElementById('phrase').children[0]
        while (ul.firstChild) {
            ul.removeChild(ul.lastChild);
        }
        this.missed = 0;
        const livesHeartImgs = document.getElementsByTagName('img')
        for (let i = 0; i < livesHeartImgs.length; i++) {
            livesHeartImgs[i].setAttribute('src', 'images/liveHeart.png')
        }
        this.handleKeyboard('key', false, 'start')
        // ------------------------

        document.getElementById('overlay').style.display = 'none'
        this.activePhrase = this.getRandomPhrase()
        let phrase = new Phrase(this.activePhrase)
        phrase.addPhraseToDisplay(this.activePhrase)
    }

    // handles any button clicks
    handleInteraction(button) {
        if (pressedButtons.includes(button)) {
            return
        }
        let phrase = new Phrase(this.activePhrase)
        if (phrase.checkLetter(button)) {
            this.handleKeyboard('chosen', true, 'in-middle', button)
            this.checkForWin()
        } else {
            this.handleKeyboard('wrong', true, 'in-middle', button)
            this.removeLife()
            pressedButtons.push(button)
        }
    }


    /**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
    checkForWin() {
        const hiddenElement = document.getElementsByTagName('li')
        for (let i = 0; i < this.activePhrase.length; i++) {
            if (hiddenElement[i].className.includes('hide')) {
                return
            }
        }
        this.gameOver('Great job!', 'win');
    };

    /**
* Increases the value of the missed property
* Removes a life from the scoreboard
* Checks if player has remaining lives and ends game if player is out
*/
    removeLife() {
        const livesHeartImg = document.getElementsByTagName('img')[this.missed]
        livesHeartImg.setAttribute('src', 'images/lostHeart.png')
        this.missed ++;
        if (this.missed == totalLives) {
            this.gameOver('Sorry better luck next time', 'lose');
        }
    };


    /**
* Displays game over message
* @param {boolean} gameWon - Whether or not the user won the game
*/
    gameOver(gameWon, modifyClass) {
        document.getElementById('overlay').style.display = ''
        document.getElementById('overlay').className = modifyClass
        document.querySelector('#game-over-message').innerHTML = gameWon
    };
}
