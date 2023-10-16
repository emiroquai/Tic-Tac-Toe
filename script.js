const Gameboard = (() => {
    const board = ['X', 'O', 'X', '', '', '', '', '', '']

    const getBoard = () => board;

    //Make move function
    const makeMove = (index, playerSymbol) => {
    //logic to make move
        board[index] = playerSymbol;
    }
    //Update gameboard function

    //Check for a winner function

    return {
        getBoard,
        makeMove
    };
})();

//Player factory
function Player (name, playerSymbol) {
    return {name , playerSymbol};
}


