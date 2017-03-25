var PomodoroBreakControl = (function () {
    function PomodoroBreakControl(pomodoroManager, pomodoroClass) {
        PomodoroControl.call(this, pomodoroManager, pomodoroClass);
        this.pomodoroClass = pomodoroClass;
        this.pomodoroClassSelector = "." + pomodoroClass;
        this.setPomodoroValue = pomodoroManager.setBreak;

        this.getDefaultControlValue = function() {
            return 5;
        }

        this.getControlHeader = function() {
            return 'Break Length';
        }
    }

    PomodoroBreakControl.prototype = PomodoroControl.prototype;
    return PomodoroBreakControl;    
}());

