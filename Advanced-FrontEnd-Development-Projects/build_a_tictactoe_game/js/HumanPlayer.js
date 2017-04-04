function HumanPlayer() {
    var removeBinders = function() {
        $('.cell').unbind();
    }

    this.playTurn = function() {
        // returns cell name selected cell-ij and then the manager should extract from this
        // exactly what row and column was clicked and set it in the board.

        return new Promise(function(resolve, reject) {
            removeBinders();
            $('.cell').click(function(e) {
               resolve(e.currentTarget.getAttribute('id')); 
            });
        });

    }
}