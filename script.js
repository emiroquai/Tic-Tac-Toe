//Gameboard module

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', '']
    const cells = document.querySelectorAll('button.cell')
    
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
        board[index] = activePlayer.playerSymbol;
    };

    //Check for a winner function
    const checkWinner = () => {
    
        const winCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
    
        for (const comb of winCombs) {
            if (
                cells[comb[0]].textContent != '' &&
                cells[comb[0]].textContent == cells[comb[1]].textContent &&
                cells[comb[1]].textContent == cells[comb[2]].textContent 
            ) {
                return true               
            }  
        }
        return false
    }

    // Check for a draw
    const checkDraw = () =>{
        function isBoardFull() {
            for (let index = 0; index < board.length; index++) {
                const element = board[index];
                if (element === '' ) {
                    return false
                }
            }
            return true
        }
        if (isBoardFull() && !checkWinner()) {
            return true
        } else {
            return false
        }

    }
    
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
        update,
        checkWinner,
        checkDraw
    };
})();

Gameboard.update();

//Player factory
function Player (name, playerSymbol) {
    return {name , playerSymbol};
}

// Screen controller

function clickHandlerBoard() {
    const cells = document.querySelectorAll('button.cell');
    cells.forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener('click', () => {
            if (Gameboard.getBoard()[index] === '') {
                Gameboard.makeMove(index);
                Gameboard.update();
            }
        });
    });
}

clickHandlerBoard();
