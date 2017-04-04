function GameBoard() {
    this.board = [
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

    this.setItem = function(row, col, item) {
        this.board[row][col] = item;
    }
    
}