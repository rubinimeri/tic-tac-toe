function Player(marker, name) {
    return {marker, name}
}

const gameBoard = (function() {
    const gameboard = [];
    for(let i = 0; i < 9; i++){
        gameboard[i] = {
            el: document.createElement("div"),
            marker: ""
        };
    }
    return gameboard;
})();

(function render(){
    const container = document.querySelector(".game-board");
    gameBoard.forEach(element => {
        container.append(element.el)
    });
})();

const displayController = (function() {
    let playerOne;
    let playerTwo;
    const start = document.querySelector(".start");
    const restart = document.querySelector(".restart");
    const gameResult = document.querySelector(".result");
    let turn = true;
    let tie;

    start.addEventListener("click", () => {
        const x = document.querySelector("#player-x").value;
        const o = document.querySelector("#player-o").value;

        playerOne = Player("X", x);
        playerTwo = Player("O", o);

        document.querySelector(".game-board").style.display = "grid";
        document.querySelector(".buttons").style.display = "none";
        restart.style.display = "block"
    })
    restart.addEventListener("click", () => {
        document.querySelector(".game-board").style.display = "none";
        document.querySelector(".buttons").style.display = "flex";
        restart.style.display = "none"
        turn = true;
        tie = undefined;

        gameBoard.forEach(element => {
            element.el.innerText = "";
            element.marker = "";
            playerOne = undefined;
            playerTwo = undefined;
        })
    })
    gameBoard.forEach(element => {
        element.el.addEventListener("click", () => {
            if(element.marker === "" && turn === true){
                element.el.innerText = playerOne.marker;
                element.marker = playerOne.marker
                if(gameBoard[0].marker === "X" && gameBoard[1].marker === "X" && gameBoard[2].marker === "X" ||
                   gameBoard[3].marker === "X" && gameBoard[4].marker === "X" && gameBoard[5].marker === "X" ||
                   gameBoard[6].marker === "X" && gameBoard[7].marker === "X" && gameBoard[8].marker === "X" ||
                   gameBoard[0].marker === "X" && gameBoard[4].marker === "X" && gameBoard[8].marker === "X" ||
                   gameBoard[2].marker === "X" && gameBoard[4].marker === "X" && gameBoard[6].marker === "X" ||
                   gameBoard[0].marker === "X" && gameBoard[3].marker === "X" && gameBoard[6].marker === "X" ||
                   gameBoard[1].marker === "X" && gameBoard[4].marker === "X" && gameBoard[7].marker === "X" ||
                   gameBoard[2].marker === "X" && gameBoard[5].marker === "X" && gameBoard[8].marker === "X")
                {
                    gameResult.innerText = `Congratulations ${playerOne.name}, you won!`;
                    gameResult.style.display = "block"
                    return turn = "X WINS";
                }
                let result = gameBoard.find(element => element.marker === "");
                if(result === undefined){
                    gameResult.innerText = `It's a tie!`;
                    gameResult.style.display = "block";
                    return tie = "tie";
                }
                turn = false;
            }
            else if(element.marker === "" && turn === false){
                element.el.innerText = playerTwo.marker;
                element.marker = playerTwo.marker
                if( gameBoard[0].marker === "O" && gameBoard[1].marker === "O" && gameBoard[2].marker === "O" ||
                    gameBoard[3].marker === "O" && gameBoard[4].marker === "O" && gameBoard[5].marker === "O" ||
                    gameBoard[6].marker === "O" && gameBoard[7].marker === "O" && gameBoard[8].marker === "O" ||
                    gameBoard[0].marker === "O" && gameBoard[4].marker === "O" && gameBoard[8].marker === "O" ||
                    gameBoard[2].marker === "O" && gameBoard[4].marker === "O" && gameBoard[6].marker === "O" ||
                    gameBoard[0].marker === "O" && gameBoard[3].marker === "O" && gameBoard[6].marker === "O" ||
                    gameBoard[1].marker === "O" && gameBoard[4].marker === "O" && gameBoard[7].marker === "O" ||
                    gameBoard[2].marker === "O" && gameBoard[5].marker === "O" && gameBoard[8].marker === "O")
                {
                    gameResult.innerText = `Congratulations ${playerTwo.name}, you won!`;
                    gameResult.style.display = "block"
                    return turn = "O WINS";
                }
                let result = gameBoard.find(element => element.marker === "");
                if(result === undefined){
                    gameResult.innerText = `It's a tie!`;
                    gameResult.style.display = "block"
                    return tie = "tie";
                }
                turn = true;
            }
        })
    })

})();