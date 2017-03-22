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

        var pomoManager = pomodoroManager();

        $('.pomodoro_timer_state').click(function() {
            if(pomoManager.isStarted() === undefined)
                pomoManager.start();
            else
                pomoManager.pause();
        });

})(pomodoroManagerReference, pomodoroTypeEnum);

// add pomodoro manager to organize stop timer, start timer and etc...