function pomodoroControl(pomodoroManager, pomodoroClass) {
    var pomodoroClassSelector = "." + pomodoroClass;
    // can be either break or session
    var pomoType = pomodoroClass === 'pomodoro_break' ? pomodoroTypeEnum.BREAK : pomodoroTypeEnum.SESSION;

    var create = function() {
        var pomodoroHtml = String.format("\
            <div class='pomodoro_control'> \
                <div class='pomodoro_header'> \
                {0} \
                </div> \
                <div class='pomodoro-control-inputs {1}'> \
                    <span class='pomodoro_minus'> - </span> \
                    <span><input type='text' value='{2}'></input></span> \
                    <span class='pomodoro_plus'> + </span> \
                 </div> \
            </div>", getControlHeader(), pomodoroClass, getDefaultControlValue());
        
        return pomodoroHtml;
        
    }

    var setControlEvents = function() {
        $(pomodoroClassSelector + ' input').keypress(function() {
            if(pomoType === pomodoroTypeEnum.BREAK)
                pomodoroManager.setBreak();
            else if(pomoType === pomodoroTypeEnum.SESSION)
                pomodoroManager.setSession();
        });
    }

    var getDefaultControlValue = function() {
        if (pomoType === pomodoroTypeEnum.BREAK) return 5;
        else if(pomoType === pomodoroTypeEnum.SESSION) return 25;
    }

    var getControlHeader = function() {
        if (pomoType === pomodoroTypeEnum.BREAK) return 'Break Length';
        else if(pomoType === pomodoroTypeEnum.SESSION) return 'Session Length';  
    }

    var setup = function() {
        if (pomoType === pomodoroTypeEnum.BREAK) return setupBreak()
        else if(pomoType === pomodoroTypeEnum.SESSION) return setupSession();

    }

    var setupBreak = function() {
        return {
            create: create,
            setControlEvents: setControlEvents
        }
    }

    var setupSession = function() {
        return {
            create: create,
            setControlEvents: setControlEvents
        }
    }

    return setup();
}