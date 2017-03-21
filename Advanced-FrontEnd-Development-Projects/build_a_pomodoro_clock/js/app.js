  var pomodoroTypeEnum = pomodoroType();
  var pomodoroManagerReference = pomodoroManager();

  (function (pomodoroManagerRef, pomodoroTypeEnum) {
        $(document).ready(function() {
            $('.pomodoro_controls div').each(function() {
                var pomodoroClass = $(this).attr('class');
                var pomodoroCtrlBase = pomodoroControlFactory().build(pomodoroClass);
                if(pomodoroCtrlBase !== undefined) {
                    var pomodoroCtrl = new pomodoroCtrlBase(pomodoroManagerRef, pomodoroClass);
                    $(this).replaceWith(pomodoroCtrl.create());
                    //send as param to setControlEvents the appropriate controlmanager function to run
                    pomodoroCtrl.setControlEvents();
                }
            });
        });


        var circle = document.getElementById('pomodoro_timer_circle_filler');
        var interval = 30;
        var angle = 0;
        var angle_increment = 6;
        var circle_radius = circle.getAttribute('r');

        // circumference of a circle is : 2PI * R.
        var full_angle = 2 * Math.PI * circle_radius;
        window.timer = window.setInterval(function () {
            circle.setAttribute("stroke", "#FF8D82");
            circle.setAttribute("stroke-dasharray", angle + ", 200000");


            if (angle >= full_angle) {
                window.clearInterval(window.timer);
            }
            angle += angle_increment;
        }.bind(this), interval);
})(pomodoroManagerReference, pomodoroTypeEnum);

// add pomodoro manager to organize stop timer, start timer and etc...