function SimonUIManager() {
    var timer;

    this.runGameplay = function(simonManagerFunctions) {
        console.log(simonManagerFunctions.isActivated);
        console.log(simonManagerFunctions.isStarted);
        if (simonManagerFunctions.isActivated && simonManagerFunctions.isStarted) {
            alert('started');
            // handle score blinking
            // handle color blinking
            // setTimeout waiting for user to mimic
            // respond to the user clicks.
            // decide on next action by the strict mode
        }
    }

}