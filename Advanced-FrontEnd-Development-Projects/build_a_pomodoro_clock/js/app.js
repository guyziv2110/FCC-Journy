  (function () {
        var pauseFACode = "&#xf04c";
        var startFACode = "&#xf04b";
        // these defaults values can be served via the objects.
        var pomodoroManagerReference = pomodoroManager(25, 5);        

        $(document).ready(function() {
            $('.pomodoro_controls div').each(function() {
                var pomodoroClass = $(this).attr('class');
                var PomodoroCtrlBase = pomodoroControlFactory().build(pomodoroClass);
                if(PomodoroCtrlBase !== undefined) {
                    var PomodoroCtrl = new PomodoroCtrlBase(pomodoroManagerReference, pomodoroClass);
                    $(this).replaceWith(PomodoroCtrl.create());
                    PomodoroCtrl.setControlEvents();
                }
            });
        });

        $('#pomodoro_timer_state').click(function() {
            if(!pomodoroManagerReference.isStarted()) {
                $(this).html(pauseFACode);
                pomodoroManagerReference.start();
            }
            else {
                $(this).html(startFACode);
                pomodoroManagerReference.pause();
            }
        });
})();