function GameBoard() {
    this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    this.getSize = function () {
        return this.board[0].length;
    }

    this.isEmptyCell = function(row, col) {
        return board[row][col] === '';
    }

    this.getItem = function(row, col) {
        return board[row][col];
    }

    this.setItem = function(row, col, item) {
        this.board[row][col] = item;
    }
    
}