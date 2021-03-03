const phraseSection = document.querySelector('#phrase')

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase()
    }

    addPhraseToDisplay(phrase) {
        let listElements = [];
        let letter = this.phrase.split('')
        for (let i = 0; i < phrase.length; i++) {
            listElements[i] = document.createElement('li');
            if (letter[i] === ' ') {
                listElements[i].className = 'space'
            } else {
                listElements[i].className = `hide letter ${
                    letter[i]
                }`
            } listElements[i].innerHTML = letter[i]
            phraseSection.children[0].appendChild(listElements[i])
        }
    }

    /**
* Checks if passed letter is in phrase
* @param (string) letter - Letter to check
*/
    checkLetter(letter) {
        let result = this.phrase.includes(letter)
        if (result) {
            this.showMatchedLetter(letter)
            return result
        }
    };


    /**
* Displays passed letter on screen after a match is found
* @param (string) letter - Letter to display
*/
    showMatchedLetter(letter) {
        const hiddenElement = document.getElementsByTagName('li')
        for (let i = 0; i < this.phrase.length; i++) {
            if (hiddenElement[i].innerHTML == letter) {
                hiddenElement[i].className = `show letter ${i}`
            }
        }
    };
}
