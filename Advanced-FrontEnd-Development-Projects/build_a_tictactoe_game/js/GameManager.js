// controller
function GameManager() {
    var gameBoard = new GameBoard(); // GameBoard instance
    var gameManager = GameManagerUI(gameBoard.board);
    // working on game board design
     
    // methods 
    // access GameManagerUI to paint the board.
    // 

    this.start = function() {
        gameManager.draw();
    }
}