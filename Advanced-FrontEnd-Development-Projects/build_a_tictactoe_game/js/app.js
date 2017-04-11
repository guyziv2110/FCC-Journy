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
            var playerType = e.currentTarget.className.indexOf('cross') > -1 ? 'X' : 'O';
            $(".game-settings").fadeOut().promise().done(function() {
                gm.start(playerType);
            });
        }); 
    });
    
})();