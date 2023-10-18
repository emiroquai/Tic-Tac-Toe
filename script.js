//Gameboard module

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', '']
    
    const getBoard = () => board;

    //Make move function
    const makeMove = (index) => {
        activePlayer = GameController.getActivePlayer();
        board[index] = activePlayer.playerSymbol;
    };

    return {
        getBoard,
        makeMove
    };
})();



// Game controller
const GameController = (() => {
    const board = Gameboard.getBoard();
    const cells = document.querySelectorAll('button.cell')

    //Player factory
    function Player (name, playerSymbol) {
        return {name , playerSymbol};
    }

    const x = Player("Player1", "X")
    const o = Player("Player2", "O")

    let activePlayer = x

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        if (activePlayer === null || activePlayer === o) {
            activePlayer = x;
        } else {
            activePlayer = o;
        }
        }

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
                board[comb[0]] != '' &&
                board[comb[0]] == board[comb[1]] &&
                board[comb[1]] == board[comb[2]] 
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

    return {
        Player,
        getActivePlayer,
        switchPlayer,
        checkWinner,
        checkDraw
        };
})();

// Screen controller
function ScreenController() {
    const cells = document.querySelectorAll('button.cell');
    board = Gameboard.getBoard();
      //Update display function
      const displayBoard = () => {
        cells.forEach((cell, index) => {
            cell.dataset.index = index;
            cell.textContent = board[index];
        })
    }

    function clickHandlerBoard() {
        cells.forEach((cell, index) => {
            cell.dataset.index = index;
            cell.addEventListener('click', () => {
                if (Gameboard.getBoard()[index] === '') {
                    Gameboard.makeMove(index);
                    GameController.switchPlayer();
                    displayBoard();

                }
            });
        });
    }

    clickHandlerBoard();
}

ScreenController();