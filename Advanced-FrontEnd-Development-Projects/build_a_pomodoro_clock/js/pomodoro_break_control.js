function pomodoroBreakControl() {
    var getDefaultControlValue = function() {
        return 100;
    }

    var getControlHeader = function() {
        return 'Break Length';
    }

    var setControlEvents = function() {
        $(pomodoroClassSelector + ' input').keypress(function() {
            pomodoroManager.setBreak();
        });
    }    
}