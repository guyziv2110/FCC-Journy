function GameBoard() {
    var board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    var isEmptyCell = function(row, col) {
        return board[row][col] === '';
    }

    var getItem = function(row, col) {
        return board[row][col];
    }
    
}