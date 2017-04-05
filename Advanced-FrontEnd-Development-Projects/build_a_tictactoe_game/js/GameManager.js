// controller
function GameManager() {
    var gameBoard = new GameBoard(); // GameBoard instance
    var gameManager = GameManagerUI(gameBoard.board);
    var humanPlayer = new HumanPlayer();
    var plType;
    // working on game board design
     
    // methods 
    // access GameManagerUI to paint the board.
    // 

    this.start = function(playerType) {
        plType = playerType;
        gameManager.draw(playerType);
        gameplay();
    }

    var gameplay = function() {
        var promise = humanPlayer.playTurn();
        promise.then(function(res) {
            var rowcol = res.replace('cell', '');
            gameBoard.setItem(rowcol[0], rowcol[1], plType);
            gameplay();
        });
    }

    var checkForWinner = function() {
        // row
        var size = gameBoard.getSize();
        var rowRes = true;
        for (var i = 0; i < size; i++) {
            for(var j = 0; j < size; j++) {
                //
            }
        }
    }

}