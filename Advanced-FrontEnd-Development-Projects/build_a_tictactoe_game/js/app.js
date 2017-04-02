if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}


(function() {

    var gm = new GameManager();

    $(document).ready(function() {
        $(".setting-choice").click(function(e) {
            $(".game-settings").fadeOut().promise().done(function() {
                gm.start();
            });
        }); 
    });


    function initialization(playerSelection) {
        // playerSelection X or 0

        // GameManager.startGame().
    }

})();