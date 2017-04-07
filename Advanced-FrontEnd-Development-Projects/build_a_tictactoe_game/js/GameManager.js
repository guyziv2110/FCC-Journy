function WinnerSignal(winner) {
    this.winner = winner;
};
// controller
function GameManager() {
    var gameBoard = new GameBoard(); // GameBoard instance
    var gameManagerUI = GameManagerUI(gameBoard);
    var humanPlayer = new HumanPlayer(gameBoard);
    var computerPlayer = new ComputerPlayer(gameBoard);
    var humanDrawType;
    var computerDrawType;
    // working on game board design
     
    // methods 
    // access GameManagerUI to paint the board.
    // 

    this.start = function(humDrawType) {
        humanDrawType = humDrawType;
        computerDrawType = getComputerDrawType();
        gameManagerUI.draw(humanDrawType);
        gameplay();
    }

    var getComputerDrawType = function() {
        return humanDrawType === 'X' ? 'O' : 'X';
    }

    var gameplay = function() {
        var promise = humanPlayer.playTurn();
        promise.then(function(res) {
            var rowcol = res.replace('cell', '');
            gameBoard.setItem(rowcol[0], rowcol[1], humanDrawType);
            gameManagerUI.update();
        }).then(function() {
            if(checkForWinner())
                throw new WinnerSignal(humanDrawType);
            else
                return computerPlayer.playTurn();;
        }).then(function(res) {
            gameBoard.setItem(res[0], res[1], computerDrawType);
            gameManagerUI.update();
            setTimeout(function() {
                gameplay();
            }, 1);
        }).catch(function(e) {
            if(e instanceof WinnerSignal)
                console.log(e.winner);
            else
                throw e;
        });
    }

    var checkForWinner = function() {
        return checkForRowSeries();
    }

    var checkForRowSeries = function(size) {
        var size = gameBoard.getSize();
        var diagLeftCurrent = gameBoard.getItem(0, 0);
        var diagRightCurrent = gameBoard.getItem(0, size - 1);
        var countLeftDiagSeries = 0;
        var countRightDiagSeries = 0;
        for (var i = 0; i < size; i++) {
            var countRowSeries = 0;
            var countColSeries = 0;
            var rowCurrent = gameBoard.getItem(i, 0);
            var colCurrent = gameBoard.getItem(0, i);
            for(var j = 0; j < size; j++) {
                if (!gameBoard.isEmptyCell(i, j) && gameBoard.getItem(i, j) === rowCurrent) {
                    countRowSeries++;
                }
                if (!gameBoard.isEmptyCell(j, i) && gameBoard.getItem(j, i) === colCurrent) {
                    countColSeries++;
                }                
            }

            if (!gameBoard.isEmptyCell(i, i) && gameBoard.getItem(i, i) === diagLeftCurrent) {
                countLeftDiagSeries++;
            }                    

            if (!gameBoard.isEmptyCell(i, size - i - 1) && gameBoard.getItem(i, size - i - 1) === diagRightCurrent) {
                countRightDiagSeries++;
            }   

            if (countRowSeries === 3) {
                return true;
            }

            if (countColSeries === 3) {
                return true;
            }            

            if (countLeftDiagSeries === 3) {
                return true;
            }

            if (countRightDiagSeries === 3) {
                return true;
            }               
            
        }        

        return false;
    }

}