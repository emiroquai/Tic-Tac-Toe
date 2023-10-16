//Gameboard module

const Gameboard = (() => {
    const board = ['X', 'O', 'X', '', '', '', '', '', '']
    const cells = document.querySelectorAll('div.cell')
    
    const x = Player("Player1", "X")
    const o = Player("Player2", "O")

    let activePlayer = null
    
    const getBoard = () => board;
    
    //Update display function
    const displayBoard = () => {
        cells.forEach((cell, index) => {
            cell.dataset.index = index;
            cell.textContent = board[index];
        })
    }
    
    //Game flow controller
    
    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {

        if (activePlayer === null || activePlayer === o) {
            activePlayer = x;
        } else {
            activePlayer = o;
        }
    }

    //Make move function
    const makeMove = (index) => {
        board[index] = Gameboard.getActivePlayer().playerSymbol;
        Gameboard.update();
    };

    //Check for a winner function

    //Update Gameboard
    const update = () => {
        displayBoard();
        switchPlayer();
    }

    return {
        getBoard,
        getActivePlayer,
        switchPlayer,
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

// Initialize game
function initializeGame() {
    const cells = document.querySelectorAll('div.cell');
    cells.forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener('click', () => {
            if (Gameboard.getBoard()[index] === '') {
                Gameboard.makeMove(index);
            }
        });
    });
}

initializeGame();
