function pomodoroManager() {
    var pomoTimer;
    var lastAngle = 0;

    var setSession = function() {
        console.log('setSession called');
    }

    var setBreak = function() {
        console.log('setBreak called');
    }

    var pause = function() {
         clearInterval(pomoTimer);
         pomoTimer = undefined;
    }

    var start = function() {
        var circle = document.getElementById('pomodoro_timer_circle_filler');
        var interval = 90;
        var angle_increment = 6;
        var circle_radius = circle.getAttribute('r');

        // circumference of a circle is : 2PI * R.
        var full_angle = 2 * Math.PI * circle_radius;        
        pomoTimer = window.setInterval(function () {
            circle.setAttribute("stroke", "#FF8D82");
            circle.setAttribute("stroke-dasharray", lastAngle + ", 200000");


            if (lastAngle >= full_angle) {
                window.clearInterval(pomoTimer);
            }
            lastAngle += angle_increment;
        }.bind(this), interval);
    }

    var isStarted = function() {
        return pomoTimer;
    }

    return {
        setSession: setSession,
        setBreak: setBreak,
        pause: pause,
        isStarted: isStarted,
        start: start
    }
}