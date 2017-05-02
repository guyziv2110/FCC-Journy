function SimonGameplay(simonUIElementsMapping) {
    var timer;
    // possible values indicating colors: 0, 1, 2, 3 
    var sequence = [];
    var selectionPromise;

    this.init = function() {
        sequence = [];
        sequence.push(Math.floor(Math.random() * 4));
        this.boxClickHandler();
    }

    this.clear = function() {
        this. clearSimonBox();
        clearInterval(timer);
    }

    this.clearSimonBox = function() {
        for (var i = 0; i < simonUIElementsMapping.simonBoxes.length; i++) {
            simonUIElementsMapping.simonBoxes[i].removeClass('light');
        }
    }

    this.runGameplay = function(simonManagerFunctions) {
        this.runGameplayPre(simonManagerFunctions);
    }

    this.runGameplayPre = function(simonManagerFunctions) {
        if (simonManagerFunctions.isActivated() && simonManagerFunctions.isStarted()) {
            flashMessage(simonUIElementsMapping.simonCounter.text(), 3)
            .then(() => this.runGameplayInternal(simonManagerFunctions));
        }  
    }

    this.runGameplayInternal = function(simonManagerFunctions) {
        if (simonManagerFunctions.isActivated() && simonManagerFunctions.isStarted()) {
            //alert('started');
            // handle scoring blinking

            quickMessage(sequence.length)
            .then(colorBlinkingAndTonesPlaying)
            .then(userResponse)
            .then(generateNewColor)
            .then(() => this.runGameplayInternal(simonManagerFunctions));
            
            // handle color blinking
            // setTimeout waiting for user to mimic
            // respond to the user clicks.
            // decide on next action by the strict mode
        }        
    }

    var emptyPromise = function() {
        return new Promise(function (resolve, reject) {     
            resolve('0');
        });
    }

    var quickMessage = function(msg) {
        return new Promise(function (resolve, reject) {     
             simonUIElementsMapping.simonCounter.text(msg);
             resolve('0');
        });
    }

    var flashMessage = function(msg, times) {
        return new Promise(function (resolve, reject) {     
            var counter = 0;
            timer = setInterval(function() {
                if(times === counter) {
                    clearInterval(timer);
                    resolve('0');
                }
                else {
                    simonUIElementsMapping.simonCounter.addClass('simon-led-off');
                    setTimeout(function(){
                        simonUIElementsMapping.simonCounter.removeClass('simon-led-off');
                    },250);
                    
                    counter++;
                }
            }, 500);
        });
    }

    var colorBlinkingAndTonesPlaying = function() {
        return new Promise(function (resolve, reject) {     
            var colorIndex = 0;
            timer = setInterval(function() {
                if(sequence.length === colorIndex) {
                    clearInterval(timer);
                    resolve('0');
                }
                else {
                    var currentSimonBox = simonUIElementsMapping.simonBoxes[sequence[colorIndex]];
                    // playTone...
                    currentSimonBox.addClass('light');
                    setTimeout(function(){
                        currentSimonBox.removeClass('light');
                    },1250);
                    
                    colorIndex++;
                }
            }, 2000);
        });
    }


    var userResponse = function() {
        return new Promise(function (resolve, reject) {    
            boxClick();             
        });
    }

    this.boxClickHandler = function() {
        selectionPromise = new Promise(function (resolve, reject) {
            for(var i = 0; i < simonUIElementsMapping.simonBoxes.length; i++) {
                simonUIElementsMapping.simonBoxes[i].click(function(ev) {
                    resolve(ev.target.id);
                });
            }
        });


    }

    var boxClick = function() {   
        var colorIndex = 0;
        var selection;

        timer = setInterval(function() {
            if(sequence.length === colorIndex) {
                clearInterval(timer);
            }
            else {
                var currentSimonBox = simonUIElementsMapping.simonBoxes[sequence[colorIndex]];
                
                // userClick
                // should happen immedatley and not after 2000 ms.
                selectionPromise.then(function(res) {
                    alert(res);
                });
                
                colorIndex++;
            }
        }, 2000);
    }

    var generateNewColor = function() {
        return new Promise(function (resolve, reject) {    
            sequence.push(Math.floor(Math.random() * 4));
            resolve('0');
        });        
    }

}