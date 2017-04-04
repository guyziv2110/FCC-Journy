function GameManagerUI(board) {
    var draw = function(playerType) {
        var appended = "";
        for (i = 0; i < board.length; i++) {
            for (j = 0; j < board[i].length; j++) {
                appended += String.format("\
                    <div class='cell cell-{2}' id='cell{0}{1}'> \
                    </div>", i, j, playerType );
            }
        }

        $('.game-board').append(appended);
    }

    return {
        draw: draw
    }
}