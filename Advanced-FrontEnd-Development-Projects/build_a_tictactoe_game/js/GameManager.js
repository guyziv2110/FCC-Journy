function WinnerSignal(winner) {
    this.winner = winner;
};

function GameEndsSignal() {

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

    // TODO:
    /* 
       2. show the game over status on the screen and allow starting a new game.
       3. color the winner cells
       4.
       3. check for bugs
    */

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
            else if (gameBoard.isFull())
                throw new GameEndsSignal();
            else 
                return computerPlayer.playTurn();
        }).then(function(res) {
            gameBoard.setItem(res[0], res[1], computerDrawType);
            gameManagerUI.update();
            if(checkForWinner())
                throw new WinnerSignal(computerDrawType);
            else if (gameBoard.isFull())
                throw new GameEndsSignal();                
            else {
                setTimeout(function() {
                    gameplay();
                }, 1);
            }
        }).catch(function(e) {
            if(e instanceof WinnerSignal) {
                gameManagerUI.lock();
                console.log(e.winner);
            }
            else if(e instanceof GameEndsSignal) {
                gameManagerUI.lock();
                console.log("No one won");
            }            
            else
                throw e;
        });
    }

    var checkForWinner = function(size) {
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
                if (!gameBoard.isEmptyCell(i, j) && gameBoard.getItem(i, j) === rowCurrent)
                    countRowSeries++;

                if (!gameBoard.isEmptyCell(j, i) && gameBoard.getItem(j, i) === colCurrent) 
                    countColSeries++;   
            }

            if (!gameBoard.isEmptyCell(i, i) && gameBoard.getItem(i, i) === diagLeftCurrent) 
                countLeftDiagSeries++;

            if (!gameBoard.isEmptyCell(i, size - i - 1) && gameBoard.getItem(i, size - i - 1) === diagRightCurrent)
                countRightDiagSeries++;

            if (countRowSeries === 3 || countColSeries === 3 || countLeftDiagSeries === 3 || countRightDiagSeries === 3) 
                return true;            
        }        

        return false;
    }

}