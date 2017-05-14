function SimonGameplay(simonUIElementsMapping) {
    var timer;
    // possible values indicating colors: 0, 1, 2, 3 
    var sequence = [];
    var selectionPromise;
    var gameSignals = signals();

    this.init = function() {
        sequence = [];
        sequence.push(Math.floor(Math.random() * 4));
        this.boxClickHandler();
    }

    this.clear = function() {
        this. clearSimonBox();
        this.clearEvents();
        clearInterval(timer);
    }

    this.clearEvents = function() {
        events.removeAll();

        for (var i = 0; i < simonUIElementsMapping.simonBoxes.length; i++) 
            simonUIElementsMapping.simonBoxes[i].unbind('click');
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
            .then(doInteractive)
            .then(userResponse)
            .then((res) => {
                undoInteractive();
                if(!res && simonManagerFunctions.isStrictMode()) {
                     throw new gameSignals.RestartGame();
                }
                else if(!res && !simonManagerFunctions.isStrictMode()) {
                     return flashMessage("!!", 3)
                }
                else {
                    return generateNewColor();
                }
                    
            })
            .then(() => this.runGameplayInternal(simonManagerFunctions))
            .catch(function(e) {
                if(e instanceof gameSignals.RestartGame) {
                    quickMessage("!!");
                    simonManagerFunctions.restart();
                }
            });
            // handle color blinking
            // setTimeout waiting for user to mimic
            // respond to the user clicks.
            // decide on next action by the strict mode
        }        
    }

    var doInteractive = function() {
        for(var i = 0; i < simonUIElementsMapping.simonBoxes.length; i++) {   
            simonUIElementsMapping.simonBoxes[i].addClass('clickable');
        }
    }

    var undoInteractive = function() {   
        for(var i = 0; i < simonUIElementsMapping.simonBoxes.length; i++) {   
            simonUIElementsMapping.simonBoxes[i].removeClass('clickable');
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
            simonUIElementsMapping.simonCounter.text(msg);
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

    var playTone = function(toneId) {
        simonUIElementsMapping.simonBoxesAudios[toneId].play();
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
                    playTone(sequence[colorIndex]);
                    currentSimonBox.addClass('light');
                    setTimeout(function(){
                        currentSimonBox.removeClass('light');
                    }, 650);
                    
                    colorIndex++;
                }
            }, 800);
        });
    }


    var userResponse = function() {
        return new Promise(function (resolve, reject) {    
            var colorIndex = 0;
            var selection;
            var userSelectedBox = false;

            var subscription = events.subscribe('clickedBox', function(obj) {
                userSelectedBox = true;

                var selectedSimonBoxColorIndex = parseInt(obj.boxId.replace(/\D/g, ''));
                
                var currentSimonBox = simonUIElementsMapping.simonBoxes[selectedSimonBoxColorIndex];

                currentSimonBox.addClass('light');
                setTimeout(function(){
                    currentSimonBox.removeClass('light');

                    if(selectedSimonBoxColorIndex !== sequence[colorIndex]) {
                        playTone('err');
                        clearInterval(timer);
                        resolve(false);
                    }
                    else {    
                        playTone(selectedSimonBoxColorIndex);            
                        colorIndex++;

                        if (colorIndex === sequence.length)
                        {
                            clearInterval(timer);
                            subscription.remove();
                            resolve(true);

                        }
                    }
                },75);
            });        

            timer = setInterval(function() {
                if (!userSelectedBox) {
                    clearInterval(timer);
                    resolve(false);
                }

                // reset selection.
                userSelectedBox = false;
            }, 2000);        
        });
    }

    this.boxClickHandler = function() {
        // dealing with single promise 
        // using events
        selectionPromise = new Promise(function (resolve, reject) {
            for(var i = 0; i < simonUIElementsMapping.simonBoxes.length; i++) {
                simonUIElementsMapping.simonBoxes[i].click(function(ev) {
                    events.publish('clickedBox', {
                        boxId: ev.target.id // any argument
                    });                    
                    //resolve(ev.target.id);
                });
            }
        });


    }

    var generateNewColor = function() { 
        return new Promise(function (resolve, reject) {    
            sequence.push(Math.floor(Math.random() * 4));
            resolve(true);
        });
    }

}