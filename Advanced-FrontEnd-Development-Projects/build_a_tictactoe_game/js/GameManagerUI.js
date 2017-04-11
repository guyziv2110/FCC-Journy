function gameManagerUI(gameboard) {
    var draw = function(playerType) {
        $('.game-board').remove();

        var appended = "<div class='game-board'>";
        for (i = 0; i < gameboard.board.length; i++) {
            for (j = 0; j < gameboard.board[i].length; j++) {
                appended += String.format("\
                    <div class='cell cell-{2}' id='cell{0}{1}'> \
                    </div>", i, j, playerType );
            }
        }

        appended += "</div>";

        $('.container').append(appended).show();
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

    var replay = function(winner) {
        var appended = "";
        var headerText = winner ? winner + " is the winner!" : "No one won";
        appended += String.format("\
                    <div class='game-replay'> \
                        <h1>{0}<\h1> \
                        <h2>Replay ?</h2> \
                        <div class='replay-choices'> \
                            <div class='replay-choice replay-choice-ok'> \
                                <i class='fa fa-check' aria-hidden='true'></i> \
                            </div> \
                            <div class='replay-choice replay-choice-cancel'> \
                                <i class='fa fa-close' aria-hidden='true'></i> \
                            </div> \
                        </div> \
                    </div>", headerText);
    
        $('.container').append(appended);


        return new Promise(function(resolve, reject) {
            $('.replay-choice-ok').click(function() {
                $('.game-replay').remove();
                    resolve(true); 
            });  

            $('.replay-choice-cancel').click(function() {
                $('.game-replay').remove();
                    resolve(false); 
            });              
        });   
    }

    var quit = function() {
        var appended = "";
        appended += String.format("\
                    <div class='game-quit'> \
                        <div class='quit-message'> \
                            This tab will be closed in few seconds \
                        </div> \
                    </div>");
    
        $('.container').append(appended);


        return new Promise(function(resolve, reject) {
            $('.game-replay').remove();
                resolve(true); 
        });   
    }

    return {
        draw: draw,
        update: update,
        lock: lock,
        replay: replay,
        quit: quit
    }
}