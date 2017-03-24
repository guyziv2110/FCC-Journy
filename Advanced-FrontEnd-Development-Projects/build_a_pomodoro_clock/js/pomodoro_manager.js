function pomodoroManager() {
    var pomoTimer;
    var pomoTypes =  pomodoroType();
    var currTimerType;
    // these are the session and break times determined by the controls (in seconds).
    var sessionTime = 0;
    var breakTime = 0;

    var sessionIncrement;
    var breakIncrement;
    
    var lastAngle = 0;
    var overallTime;
    var angleAddition;
    var pomoFiller;
    var pomoText;

    var isPaused = false;

    var circle = document.getElementById('pomodoro_timer_circle_filler');
    var circle_timer = document.getElementById('pomodoro_timer_per');
    var circle_timer_title = document.getElementById('pomodoro_timer_title');
    var pomodoro_timer_state = document.getElementById('pomodoro_timer_state');

    var circle_radius = circle.getAttribute('r');
    // circumference of a circle is : 2PI * R.
    var full_angle = 2 * Math.PI * circle_radius;    

    var canSet = function() {
        return pomoTimer === undefined;
    }

    var canInit = function(t) {
        return currTimerType === t;
    }

    var setSession = function(v) {
        sessionTime = v * 60;
        sessionIncrement = full_angle / sessionTime;
        if(canInit(pomoTypes.SESSION)) initTimer(sessionTime, sessionIncrement);
        console.log('setSession called');
    }

    var setBreak = function(v) {
        breakTime = v * 60;
        breakIncrement = full_angle / breakTime;
        if(canInit(pomoTypes.BREAK)) initTimer(breakTime, breakIncrement);        
        console.log('setBreak called');
    }

    var initTimer = function(d, s) {
        circle_timer.innerHTML = pomodoroExactTime(d);
        overallTime = d;
        lastAngle = 0;
        angleAddition = s;
    }

    var pause = function() {
         clearInterval(pomoTimer);
         pomoTimer = undefined;
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
        if(!isPaused)
            currTimerType === pomoTypes.SESSION ? startBreak() : startSession();
        else {
            isPaused = false;
            timerHandler();
        }
    }

    var timerHandler = function() {
        var interval = 1000;    
    
        circle_timer_title.setAttribute("fill", filler);
        pomodoro_timer_per.setAttribute("fill", filler);
        pomodoro_timer_state.setAttribute("fill", filler);
        circle_timer_title.innerHTML = pomoText;
        
        pomoTimer = window.setInterval(function () {
            circle.setAttribute("stroke", filler);
            circle.setAttribute("stroke-dasharray", lastAngle + ", 200000");
            circle_timer.innerHTML = pomodoroExactTime(overallTime);
            overallTime--;
            if (lastAngle >= full_angle || overallTime <= 0) {
                window.clearInterval(pomoTimer);
                lastAngle = 0;
                circle.setAttribute("stroke", "#D1D9DF");
                circle.setAttribute("stroke-dasharray", 0);
                setTimeout(() => setNextTimer(), 0);
            }
            else 
                lastAngle += angleAddition;
        }.bind(this), interval);
    }

    var start = function() {
        setNextTimer();
    }

    var pomodoroExactTime = function(ds) {
        var h = Math.floor(ds / 3600);
        var m = Math.floor(ds % 3600 / 60);        
        var s = Math.floor(ds % 3600 % 60);

        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 

    }

    var isStarted = function() {
        return pomoTimer;
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