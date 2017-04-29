function SimonManager(simonUIElements) {
    var activated = false;
    var started = false;
    var strictMode = false;
    var simonUIManager = new SimonUIManager();

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
        var simonPowerSwitch = $(simonUIElements.simonPowerSwitch);
        
        $(simonUIElements.simonSwitchContainer).click(function() {
            simonPowerSwitch.toggleClass('simon-switch-on');
            that.isActivated() ? that.deactivate() : that.activate();
        });    
    }

    this.isActivated = function() {
        return activated;
    }

    this.activate = function() {
        activated = true;
        this.setEvents();
    }

    this.start = function() {
        started = true;
        simonUIManager.runGameplay(
            {
                isStrictMode: strictMode,
                isActivated: activated,
                isStarted: started
            }
        );
        // access UI start method
    }

    this.deactivate = function() {
        activated = false;
        // access UI stop method / turn of interval

        // game reset - state of random colors and score
        // count clean
        var simonCounter = $(simonUIElements.simonCounter);
        var simonPowerSwitch = $(simonUIElements.simonPowerSwitch);
        var simonStart = $(simonUIElements.simonStart);
        var simonReverseMode = $(simonUIElements.simonReverseMode);
        var simonSwitchContainer = $(simonUIElements.simonSwitchContainer);

        simonCounter.text('--');
        simonCounter.addClass('simon-led-off');
        simonPowerSwitch.removeClass('simon-led-on');
        simonStart.off('click');
        simonReverseMode.off('click');        

    }

    this.reverseStrictMode = function() {
        strictMode = !strictMode;
    }

    this.setEvents = function(startGameId, strictModeId, powerGameId) {
        var that = this;
        
        $(simonUIElements.simonStart).click(function() {
            that.start();
        });

        $(simonUIElements.simonReverseMode).click(function() {
            that.reverseStrictMode();
        });    

    }
}