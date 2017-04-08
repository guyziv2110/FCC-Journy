function GameManagerUI(gameboard) {
    var draw = function(playerType) {
        var appended = "";
        for (i = 0; i < gameboard.board.length; i++) {
            for (j = 0; j < gameboard.board[i].length; j++) {
                appended += String.format("\
                    <div class='cell cell-{2}' id='cell{0}{1}'> \
                    </div>", i, j, playerType );
            }
        }

        $('.game-board').append(appended).show();
    }

    var update = function() {
        for (i = 0; i < gameboard.board.length; i++) {
            for (j = 0; j < gameboard.board[i].length; j++) {
                if (!gameboard.isEmptyCell(i, j)) {
                    var playerType = gameboard.getItem(i, j);
                    $('#cell' + i + j).removeClass().addClass('occupied-cell').addClass('occupied-cell-' + playerType);
                }
            }
        }        
    }

    var lock = function() {
        for (i = 0; i < gameboard.board.length; i++) {
            for (j = 0; j < gameboard.board[i].length; j++) {   
                if (gameboard.isEmptyCell(i, j)) {     
                    $('#cell' + i + j).removeClass().addClass('locked-cell');
                }
            }
        }
    }

    return {
        draw: draw,
        update: update,
        lock: lock
    }
}