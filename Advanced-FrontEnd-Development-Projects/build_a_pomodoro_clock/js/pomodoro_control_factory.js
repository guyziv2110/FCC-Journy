function pomodoroControlFactory() {
    var build = function(controlClass) {
        if(controlClass === 'pomodoro_break') {
            return PomodoroBreakControl;           
        }
        else if(controlClass === 'pomodoro_session') {
            return PomodoroSessionControl;           
        }        

    }

    return {
        build: build
    }
}