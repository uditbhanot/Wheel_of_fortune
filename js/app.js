const game = new Game();

document.getElementById('btn__reset').addEventListener('click', () => {
    game.startGame();
})

let buttons = document.querySelectorAll(".key");

// listening to the onScreen keyboard buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (event) {
        game.handleInteraction(event.target.textContent)
    })
}

document.addEventListener("keyup", event => {
    if (/^([a-zA-Z])$/.test(event.key)) {
        game.handleInteraction(event.key.toLowerCase());
    }
});



