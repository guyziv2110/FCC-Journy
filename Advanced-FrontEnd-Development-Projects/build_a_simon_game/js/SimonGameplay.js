function SimonGameplay(simonUIElementsMapping) {
    var timer;
    // possible values indicating colors: 0, 1, 2, 3 
    var sequence = [];

    this.init = function() {
        sequence = [];
    }

    this.runGameplay = function(simonManagerFunctions) {
        console.log(simonManagerFunctions.isActivated);
        console.log(simonManagerFunctions.isStarted);
        if (simonManagerFunctions.isActivated && simonManagerFunctions.isStarted) {
            //alert('started');
            flashMessage(simonUIElementsMapping.simonCounter.text(), 3);
            // handle score blinking
            // handle color blinking
            // setTimeout waiting for user to mimic
            // respond to the user clicks.
            // decide on next action by the strict mode
        }
    }

    var flashMessage = function(msg, times) {
        var counter = 0;
        timer = setInterval(function() {
            if(times === counter) {
                clearInterval(timer);
            }
            else {
                simonUIElementsMapping.simonCounter.addClass('simon-led-off');
                setTimeout(function(){
                    simonUIElementsMapping.simonCounter.removeClass('simon-led-off');
                },250);
                
                counter++;
            }
        }, 500);
    }

    var colorBlinking = function() {

    }

}