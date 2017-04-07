function ComputerPlayer(gameBoard) {

    this.playTurn = function() {
        var rowcol = generateCellPos();
        
        while (!gameBoard.isEmptyCell(rowcol[0], rowcol[1])) {
            rowcol = generateCellPos();
        }

        return rowcol;
    }

    var generateCellPos = function() {
        var i = Math.floor((Math.random() * 3));
        var j = Math.floor((Math.random() * 3));

        return [i, j];
    }

}