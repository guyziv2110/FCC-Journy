function SimonManager(simonUIElements) {
    var activated = false;
    var started = false;
    var strictMode = false;
    var simonGameplay;
    var simonUIElementsMapping = {};

    // logic
    // 1. generate random number between 0 to 3 (indicating the next random color to be blinked)
    // 2. save the generated random number in an array (to keep the whole series of blinking)

    // UI
    // 3. when a random number is generated show blinking (lock clicks and etc...)
    

    // notes:
    // support strict mode (after one mistake game restart)
    // support count displaying, game starting and so on...

    this.init = function() {
        var that = this;

        Object.keys(simonUIElements).forEach(function(elementKey) {
            simonUIElementsMapping['' + elementKey] = $(simonUIElements[elementKey])
        });
        
        simonUIElementsMapping.simonSwitchContainer.click(function() {
            simonUIElementsMapping.simonPowerSwitch.toggleClass('simon-switch-on');
            that.isActivated() ? that.deactivate() : that.activate();
        });    

        simonGameplay = new SimonGameplay(simonUIElementsMapping);
    }

    this.isActivated = function() {
        return activated;
    }

    this.activate = function() {
        activated = true;
        simonUIElementsMapping.simonCounter.removeClass('simon-led-off');
        this.setEvents();
    }

    this.start = function() {
        started = true;
        simonGameplay.runGameplay(
            {
                isStrictMode: strictMode,
                isActivated: activated,
                isStarted: started
            }
        );
    }

    this.deactivate = function() {
        activated = false;
        // access UI stop method / turn of interval

        // game reset - state of random colors and score
        // count clean
        reset();
        simonUIElementsMapping.simonCounter.text('--');
        simonUIElementsMapping.simonCounter.addClass('simon-led-off');
        simonUIElementsMapping.simonModeLed.removeClass('simon-led-on');
        simonUIElementsMapping.simonStart.off('click');
        simonUIElementsMapping.simonReverseMode.off('click');        

    }

    var reset = function() {
        this.strictMode = false;
    }

    this.reverseStrictMode = function() {
        strictMode = !strictMode;
        simonUIElementsMapping.simonModeLed.toggleClass('simon-led-on');        
    }

    this.setEvents = function(startGameId, strictModeId, powerGameId) {
        var that = this;
        
        simonUIElementsMapping.simonStart.click(function() {
            that.start();
        });

        simonUIElementsMapping.simonReverseMode.click(function() {
            that.reverseStrictMode();
        });    

    }
}