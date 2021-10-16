const gameboard = (() => {
    const divs = document.querySelectorAll(".field");

    const field = [
        [divs[0], divs[1], divs[2]],
        [divs[3], divs[4], divs[5]],
        [divs[6], divs[7], divs[8]],
    ];
    const signs = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    field.forEach((row) => {
        row.forEach((column) => {
            column.addEventListener("click", () => {
                let currentRow = field.indexOf(row);
                let currentColumn = row.indexOf(column);
                if (field[currentRow][currentColumn].textContent === "") {
                    game.makeMove(currentRow, currentColumn);
                }
            });
        });
    });

    const place = (sign, x, y) => {
        field[x][y].textContent = sign;
        signs[x][y] = sign;
    };

    const reset = () => {
        divs.forEach((div) => {
            div.textContent = "";
            console.log("Field has been reset");
        });
    };
    return { place, reset, signs };
})();

const Player = (name) => {
    Player.numberOfPlayers = Player.numberOfPlayers + 1 || 0;
    Player.signs = ["X", "O", "H", "S"];
    const sign = Player.signs[Player.numberOfPlayers];
    function place(x, y) {
        gameboard.place(this.sign, x, y);
    }

    return { name, sign, place };
};

const displayController = (() => {
    const winnerDisplay = document.querySelector("#winnerDisplay");

    const displayWinner = (winner) => {
        winnerDisplay.textContent = `Congratulations! ${winner.name} has won!`;
    };

    return { displayWinner };
})();

const game = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let roundsPlayed;
    let gameEnd;

    const startGame = () => {
        player1 = Player(document.querySelector("#name-player1").textContent);

        player2 = Player(document.querySelector("#name-player2").textContent);

        roundsPlayed = 0;
        currentPlayer = player1;
        gameEnd = false;
    };

    const makeMove = (row, column) => {
        if (gameEnd) {
            return;
        }
        roundsPlayed++;
        currentPlayer.place(row, column);

        if (roundsPlayed > 4) {
            if (checkForWinner()) {
                console.log("The Winner is", currentPlayer.name);
                displayController.displayWinner(currentPlayer);
                gameEnd = true;
            }
            if (checkForTie()) {
                console.log("Tie! Win not possible");
                gameEnd = true;
            }
        }

        switchPlayer();
    };

    const checkForWinner = () => {
        let winner = false;
        let currentSign = currentPlayer.sign;
        let currentBoard = gameboard.signs;

        // Checks for 3 in a Row
        for (let i = 0; i < currentBoard.length; i++) {
            const row = gameboard.signs[i];
            if (
                row[0] === currentSign &&
                row[1] === currentSign &&
                row[2] === currentSign
            ) {
                winner = true;
            }
        }

        // Checks for 3 in a Column
        for (let i = 0; i < currentBoard[0].length; i++) {
            const column = [
                currentBoard[0][i],
                currentBoard[1][i],
                currentBoard[2][i],
            ];
            if (
                column[0] === currentSign &&
                column[1] === currentSign &&
                column[2] === currentSign
            ) {
                winner = true;
            }
        }

        // Checks for 3 diagonal
        if (
            currentBoard[0][0] === currentSign &&
            currentBoard[1][1] === currentSign &&
            currentBoard[2][2] === currentSign
        ) {
            winner = true;
        }
        if (
            currentBoard[0][2] === currentSign &&
            currentBoard[1][1] === currentSign &&
            currentBoard[2][0] === currentSign
        ) {
            winner = true;
        }

        return winner;
    };
    const checkForTie = () => {
        let currentSign = currentPlayer.sign;
        let currentBoard = gameboard.signs;
        let winPossible = false;

        // Checks for 3 in a Row
        for (let i = 0; i < currentBoard.length; i++) {
            const row = gameboard.signs[i]; // Current Row
            if (
                (row[0] !== currentSign && row[0] !== null) ||
                (row[1] !== currentSign && row[1] !== null) ||
                (row[2] !== currentSign && row[2] !== null)
            ) {
            } else {
                winPossible = true;
            }
        }

        // Checks for 3 in a Column
        for (let i = 0; i < currentBoard[0].length; i++) {
            const column = [
                currentBoard[0][i],
                currentBoard[1][i],
                currentBoard[2][i],
            ];
            if (
                (column[0] !== currentSign && column[0] !== null) ||
                (column[1] !== currentSign && column[1] !== null) ||
                (column[2] !== currentSign && column[2] !== null)
            ) {
            } else {
                winPossible = true;
            }
        }

        // Checks for 3 diagonal
        if (
            (currentBoard[0][0] !== currentSign &&
                currentBoard[0][0] !== null) ||
            (currentBoard[1][1] !== currentSign &&
                currentBoard[1][1] !== null) ||
            (currentBoard[2][2] !== currentSign && currentBoard[2][2] !== null)
        ) {
        } else {
            winPossible = true;
        }
        if (
            (currentBoard[0][2] !== currentSign &&
                currentBoard[0][2] !== null) ||
            (currentBoard[1][1] !== currentSign &&
                currentBoard[1][1] !== null) ||
            (currentBoard[2][0] !== currentSign && currentBoard[2][0] !== null)
        ) {
        } else {
            winPossible = true;
        }

        return !winPossible;
    };

    function switchPlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    return { makeMove, startGame };
})();
