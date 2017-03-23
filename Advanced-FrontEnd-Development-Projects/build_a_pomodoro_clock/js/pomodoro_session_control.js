var PomodoroSessionControl = (function () {
    function PomodoroSessionControl(pomodoroManager, pomodoroClass) {
        PomodoroControl.call(this, pomodoroManager, pomodoroClass);
        this.pomodoroClass = pomodoroClass;
        this.pomodoroClassSelector = "." + pomodoroClass;
        this.setPomodoroValue = pomodoroManager.setSession;

        this.getDefaultControlValue = function() {
            return 25;
        }

        this.getControlHeader = function() {
            return 'Session Length';
        }
    }

    PomodoroSessionControl.prototype = PomodoroControl.prototype;
    return PomodoroSessionControl;    
}());

