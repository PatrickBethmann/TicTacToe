const gameboard = (() => {
    const divs = document.querySelectorAll(".field");

    const field = [
        [divs[0], divs[1], divs[2]],
        [divs[3], divs[4], divs[5]],
        [divs[6], divs[7], divs[8]],
    ];

    const place = (sign, x, y) => {
        field[x][y].textContent = sign;
    };
    const update = () => {
        console.log(field);
        return field;
    };
    const reset = () => {
        divs.forEach((div) => {
            div.textContent = "";
            console.log("Field has been reset");
        });
    };
    return { place, update, reset, field };
})();

const Player = () => {
    Player.numberOfPlayers = Player.numberOfPlayers + 1 || 0;
    console.log(Player.numberOfPlayers);
    signs = ["X", "O", "H", "S"];
    const sign = signs[Player.numberOfPlayers];
    const score = 0;
    function place(x, y) {
        gameboard.place(this.sign, x, y);
    }

    return { score, sign, place };
};

const displayController = (() => {})();

const game = (() => {
    const player1 = Player();
    const player2 = Player();
    let currentPlayer = player1;
    let round = 0;

    const checkForWinner = () => {
        let winner;
    };

    // Game Running
    while (checkForWinner() === undefined) {
        round++;
        console.log("Current Round:", round);
        if (round >= 10) {
            break;
        }
    }

    gameboard.field.forEach((row) => {
        row.forEach((div) => {
            div.addEventListener("click", () => {
                console.log("working");
                let x = gameboard.field.indexOf(row);
                let y = row.indexOf(div);

                console.log([x, y]);
                currentPlayer.place(x, y);
                currentPlayer === player1
                    ? (currentPlayer = player2)
                    : (currentPlayer = player1);
            });
        });
    });

    console.log("Game end");
    gameboard.update();
    console.log(gameboard);
})();
