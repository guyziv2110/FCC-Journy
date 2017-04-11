// controller
function GameManager() {
    var gameBoard = new GameBoard();
    var gameManagerUIPtr = gameManagerUI(gameBoard);
    var humanPlayer = new HumanPlayer(gameBoard);
    var computerPlayer = new ComputerPlayer(gameBoard);
    var humanDrawType;
    var computerDrawType;
    var that = this;
    var gameSignals = signals();

    this.quit = function() {
        gameManagerUIPtr.quit().then(function() {
            setTimeout(function() {
                window.close();
            }, 3000);
        });;        
    }

    this.start = function(humDrawType) {
        gameBoard.reset();
        humanDrawType = humDrawType;
        computerDrawType = getComputerDrawType();
        gameManagerUIPtr.draw(humanDrawType);
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
            gameManagerUIPtr.update();
        }).then(function() {
            if(checkForWinner())
                throw new gameSignals.WinnerSignal(humanDrawType);
            else if (gameBoard.isFull())
                throw new gameSignals.GameEndsSignal();
            else 
                return computerPlayer.playTurn();
        }).then(function(res) {
            gameBoard.setItem(res[0], res[1], computerDrawType);
            gameManagerUIPtr.update();
            if(checkForWinner())
                throw new gameSignals.WinnerSignal(computerDrawType);
            else if (gameBoard.isFull())
                throw new gameSignals.GameEndsSignal();                
            else {
                setTimeout(function() {
                    gameplay();
                }, 1);
            }
        }).catch(function(e) {
            if(e instanceof gameSignals.WinnerSignal) {
                gameManagerUIPtr.lock();
                gameManagerUIPtr.replay(e.winner).then(function(res) {
                    if (res)
                        that.start(humanDrawType);
                    else  {
                        that.quit();
                    }
                });;
                console.log(e.winner);
            }
            else if(e instanceof gameSignals.GameEndsSignal) {
                gameManagerUIPtr.lock();
                gameManagerUIPtr.replay().then(function(res) {
                    if (res)
                        that.start(humanDrawType);
                    else  {
                        that.quit();
                    }
                });;
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