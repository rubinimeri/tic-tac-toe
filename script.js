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



const gameController = (function() {
    let playerOne;
    let playerTwo;
    const restart = document.querySelector(".restart");
    const gameResult = document.querySelector(".result");
    let turn = true;
    let tie;


    const startGame = () => {
        const x = document.querySelector("#player-x").value;
        const o = document.querySelector("#player-o").value;

        playerOne = Player("X", x);
        playerTwo = Player("O", o);

        console.log(playerOne, playerTwo)
        document.querySelector(".game-board").style.display = "grid";
        document.querySelector(".buttons").style.display = "none";
        restart.style.display = "block"
    }
    const restartGame = () => {
        document.querySelector(".game-board").style.display = "none";
        document.querySelector(".buttons").style.display = "flex";
        restart.style.display = "none";
        gameResult.style.display = "none";
        turn = true;
        tie = undefined;

        gameBoard.forEach(element => {
            element.el.innerText = "";
            element.marker = "";
            playerOne = undefined;
            playerTwo = undefined;
        })
    }
    const checkWinX = () => {
        return (gameBoard[0].marker === "X" && gameBoard[1].marker === "X" && gameBoard[2].marker === "X" ||
                gameBoard[3].marker === "X" && gameBoard[4].marker === "X" && gameBoard[5].marker === "X" ||
                gameBoard[6].marker === "X" && gameBoard[7].marker === "X" && gameBoard[8].marker === "X" ||
                gameBoard[0].marker === "X" && gameBoard[4].marker === "X" && gameBoard[8].marker === "X" ||
                gameBoard[2].marker === "X" && gameBoard[4].marker === "X" && gameBoard[6].marker === "X" ||
                gameBoard[0].marker === "X" && gameBoard[3].marker === "X" && gameBoard[6].marker === "X" ||
                gameBoard[1].marker === "X" && gameBoard[4].marker === "X" && gameBoard[7].marker === "X" ||
                gameBoard[2].marker === "X" && gameBoard[5].marker === "X" && gameBoard[8].marker === "X");
    }
    const checkWinO = () => {
        return (gameBoard[0].marker === "O" && gameBoard[1].marker === "O" && gameBoard[2].marker === "O" ||
                gameBoard[3].marker === "O" && gameBoard[4].marker === "O" && gameBoard[5].marker === "O" ||
                gameBoard[6].marker === "O" && gameBoard[7].marker === "O" && gameBoard[8].marker === "O" ||
                gameBoard[0].marker === "O" && gameBoard[4].marker === "O" && gameBoard[8].marker === "O" ||
                gameBoard[2].marker === "O" && gameBoard[4].marker === "O" && gameBoard[6].marker === "O" ||
                gameBoard[0].marker === "O" && gameBoard[3].marker === "O" && gameBoard[6].marker === "O" ||
                gameBoard[1].marker === "O" && gameBoard[4].marker === "O" && gameBoard[7].marker === "O" ||
                gameBoard[2].marker === "O" && gameBoard[5].marker === "O" && gameBoard[8].marker === "O")
    }
    const playround = () => gameBoard.forEach(element => {
        element.el.addEventListener("click", () => {
            function win() {
                if(element.marker === "X"){
                    gameResult.innerText = `Congratulations ${playerOne.name}, you won!`;
                    gameResult.style.display = "block"
                    setTimeout(function() {
                        gameResult.style.display = "none";
                    },3000)
                    turn = "X WINS";
                }
                else /* if(element.marker === "Y") */{
                    gameResult.innerText = `Congratulations ${playerTwo.name}, you won!`;
                    gameResult.style.display = "block"
                    setTimeout(function() {
                        gameResult.style.display = "none";
                    },3000)
                    turn = "Y WINS";
                }
            }
            function tie() {
                let result = gameBoard.find(element => element.marker === "");
                if(result === undefined){
                    gameResult.innerText = `It's a tie!`;
                    gameResult.style.display = "block";
                    setTimeout(function() {
                        gameResult.style.display = "none";
                    },3000)
                    return tie = "tie";
                }
            }
            if(element.marker === "" && turn === true){
                element.el.innerText = playerOne.marker;
                element.marker = playerOne.marker
                if(checkWinX() === true)
                {
                    return win();
                }
                tie();
                turn = false;
            }
            else if(element.marker === "" && turn === false){
                element.el.innerText = playerTwo.marker;
                element.marker = playerTwo.marker
                if(checkWinO() === true)
                {
                    return win();
                }
                tie();
                turn = true;
            }
        })
    })
    return { startGame, restartGame, playround };
})();

const displayController = (function() {
    const start = document.querySelector(".start");
    const restart = document.querySelector(".restart");

    const render = (function (){
        const container = document.querySelector(".game-board");
        gameBoard.forEach(element => {
            container.append(element.el);
        });
    })();

    start.addEventListener("click", gameController.startGame);
    restart.addEventListener("click", gameController.restartGame);
    gameController.playround();
    
})();