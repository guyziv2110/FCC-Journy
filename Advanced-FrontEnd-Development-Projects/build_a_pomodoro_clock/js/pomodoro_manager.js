function pomodoroManager(sessionTime, breakTime) {
    var pomoTimer;
    var pomoTypes =  pomodoroType();
    var currTimerType = pomoTypes.SESSION;

    var sessionIncrement;
    var breakIncrement;
    
    var sessionSet = false;
    var breakSet = false;
    
    var lastAngle = 0;
    var overallTime;
    var angleAddition;
    var pomoFiller;
    var pomoText;

    var isFirstInit = true;
    var isPaused = false;
    var interval = 1000;   

    var circle = document.getElementById('pomodoro_timer_circle_filler');
    var circleTimer = document.getElementById('pomodoro_timer_per');
    var circleTimerTitle = document.getElementById('pomodoro_timer_title');
    var circleTimerState = document.getElementById('pomodoro_timer_state');

    var circleRadius = circle.getAttribute('r');
    // circumference of a circle is : 2PI * R.
    var circleCircumference = 2 * Math.PI * circleRadius;    

    var canSet = function() {
        return pomoTimer === undefined || pomoTimer === null;
    }

    var canInit = function(t) {
        return currTimerType === t;
    }

    var setSession = function(v) {
        sessionTime = v * 60;
        sessionIncrement = circleCircumference / sessionTime;
        if(canInit(pomoTypes.SESSION)) initTimer(sessionTime, sessionIncrement);
        sessionSet = true;
    }

    var setBreak = function(v) {
        breakTime = v * 60;
        breakIncrement = circleCircumference / breakTime;
        if(canInit(pomoTypes.BREAK)) initTimer(breakTime, breakIncrement);        
        breakSet = true;
    }

    var initTimer = function(d, s) {
        circleTimer.innerHTML = pomodoroExactTime(d);
        overallTime = d;
        lastAngle = 0;
        angleAddition = s;
    }

    var pause = function() {
         clearInterval(pomoTimer);
         pomoTimer = null;
         isPaused = true;
    }

    var startBreak = function() {
        currTimerType = pomoTypes.BREAK;
        pomoText =  "Break";
        angleAddition = breakIncrement;
        overallTime = breakTime;
        filler = "#71CE21";
        timerHandler();
    }

    var startSession = function() {
        currTimerType = pomoTypes.SESSION;
        pomoText =  "Session";
        angleAddition = sessionIncrement;
        overallTime = sessionTime;
        filler = "#FF8D82";
        timerHandler();
    }

    var setNextTimer = function() {
        currTimerType === pomoTypes.SESSION ? startBreak() : startSession();
    }

    var timerHandler = function() {
        circleTimerTitle.setAttribute("fill", filler);
        circleTimer.setAttribute("fill", filler);
        circleTimerState.setAttribute("fill", filler);
        circleTimerTitle.innerHTML = pomoText;
        
        pomoTimer = window.setInterval(function () {
            circle.setAttribute("stroke", filler);
            circle.setAttribute("stroke-dasharray", lastAngle + ", 200000");
            circleTimer.innerHTML = pomodoroExactTime(overallTime);
            overallTime--;
            if (lastAngle >= circleCircumference || overallTime < 0) {
                window.clearInterval(pomoTimer);
                lastAngle = 0;
                circle.setAttribute("stroke", "#D1D9DF");
                circle.setAttribute("stroke-dasharray", 0);
                setTimeout(() => setNextTimer(), 0);
            }
            else 
                lastAngle += angleAddition;
        }, interval);
    }

    var start = function() {
        if (isFirstInit) {
            if(!breakSet) setBreak(breakTime);
            if(!sessionSet) setSession(sessionTime);
            isFirstInit = false;
            startSession();
        }
        else if(isPaused) {
            isPaused = false;
            timerHandler();
        }
        else setNextTimer();    
    }

    var pomodoroExactTime = function(ds) {
        var h = Math.floor(ds / 3600);
        var m = Math.floor(ds % 3600 / 60);        
        var s = Math.floor(ds % 3600 % 60);

        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
    }

    var isStarted = function() {
        return pomoTimer !== undefined && pomoTimer !== null;
    }

    return {
        setSession: setSession,
        setBreak: setBreak,
        pause: pause,
        isStarted: isStarted,
        start: start,
        canSet: canSet
    }
}