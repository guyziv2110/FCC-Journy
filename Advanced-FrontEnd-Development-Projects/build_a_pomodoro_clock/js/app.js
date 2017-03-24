  (function () {
        var pomodoroTypeEnum = pomodoroType();
        var pomodoroManagerReference = pomodoroManager();        

        $(document).ready(function() {
            $('.pomodoro_controls div').each(function() {
                var pomodoroClass = $(this).attr('class');
                var pomodoroCtrlBase = pomodoroControlFactory().build(pomodoroClass);
                if(pomodoroCtrlBase !== undefined) {
                    var pomodoroCtrl = new pomodoroCtrlBase(pomodoroManagerReference, pomodoroClass);
                    $(this).replaceWith(pomodoroCtrl.create());
                    //send as param to setControlEvents the appropriate controlmanager function to run
                    pomodoroCtrl.setControlEvents();
                }
            });
        });

        $('#pomodoro_timer_state').click(function() {
            if(pomodoroManagerReference.isStarted() === undefined) {
                $(this).html('&#xf04c');
                pomodoroManagerReference.start();
            }
            else {
                $(this).html('&#xf04b');
                pomodoroManagerReference.pause();
            }
        });
})();