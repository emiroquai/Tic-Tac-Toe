//Gameboard module
const Gameboard = (() => {
    const board = ['X', 'O', 'X', '', '', '', '', '', '']
    const cells = document.querySelectorAll('div.cell')

    const getBoard = () => board;

    //Update display function
    const displayBoard = () => {
        cells.forEach((cell, index) => {
            cell.dataset.index = index;
            cell.textContent = board[index];
        })
    }
    
    //Game flow controller
    const activePlayer = () => {
        const x = Player("Player1", "X")
        const o = Player("Player2", "O")
        let isPlaying = x

        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (isPlaying === x) {
                    isPlaying = o;
                } else {
                    isPlaying = x;
                }
            })
        })
        return isPlaying
    }

    //Make move function
    const makeMove = () => {
        cells.forEach((cell, index) => {
            cell.dataset.index = index;
            cell.addEventListener('click', () => {
                board[index] = activePlayer().playerSymbol;
                update();
            })
        })
    }

    //Check for a winner function

    //Update Gameboard
    const update = () => {
        Gameboard.displayBoard();
        Gameboard.activePlayer();
        Gameboard.makeMove();
    }

    return {
        getBoard,
        activePlayer,
        makeMove,
        displayBoard,
        update
    };
})();

Gameboard.update();

//Player factory
function Player (name, playerSymbol) {
    return {name , playerSymbol};
}


