function signals() {
    var WinnerSignal = function(winner) {
        this.winner = winner;
    };

    var GameEndsSignal = function() {

    };

    return {
        WinnerSignal: WinnerSignal,
        GameEndsSignal: GameEndsSignal
    }
}