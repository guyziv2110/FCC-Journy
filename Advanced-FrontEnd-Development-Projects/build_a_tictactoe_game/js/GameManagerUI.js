function GameManagerUI(board) {
    var draw = function() {
        var appended = "";
        for (i = 0; i < board.length; i++) {
            for (j = 0; j < board[i].length; j++) {
                appended += String.format("\
                    <div class='cell' id='cell{0}{1}'> \
                    </div>", i, j );
            }
        }

        $('.game-board').append(appended);
    }

    return {
        draw: draw
    }
}