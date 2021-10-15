const gameboard = (() => {
    const field = [[null, null, null], [null, null, null], [null, null,null]];
    const place = (sign, x, y) => {
        field[x][y] = sign;
    }
    const update = () => {
        console.clear();
        console.log(field);
    }
    return {place, update};
})();

const Player = (sign) => {
    const score = 0;
    function place(x, y) {
        gameboard.place(this.sign, x, y);
    }
    return {score, sign, place}
}

const displayController = (() => {
    
})();

const game = (() => {
    let currentPlayer;
    const player1 = Player("X");
    const player2 = Player("O");

    player1.place(0,0);
    player2.place(1,1)

    gameboard.update();
})();



