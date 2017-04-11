function GameBoard() {
    this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    this.reset = function() {
        for (var i = 0; i < this.getSize(); i++) {
            for (var j = 0; j < this.getSize(); j++) {
                this.board[i][j] = '';
            }
        }
    }
    
    this.getSize = function () {
        return this.board[0].length;
    }

    this.isEmptyCell = function(row, col) {
        return this.board[row][col] === '';
    }

    this.getItem = function(row, col) {
        return this.board[row][col];
    }

    this.setItem = function(row, col, item) {
        this.board[row][col] = item;
    }

    this.isFull = function () {
        var res = true;

        for (var i = 0; i < this.getSize() && res; i++) {
            for (var j = 0; j < this.getSize() && res; j++) {
                if(this.isEmptyCell(i, j)) 
                    res = false;
            }
        }

        return res;
    }
    
}