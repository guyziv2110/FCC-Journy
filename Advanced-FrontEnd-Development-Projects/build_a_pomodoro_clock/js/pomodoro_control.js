function pomodoroControl(pomodoroClass) {
    var pomodoroClassSelector = "." + pomodoroClass;
    var pomoType = pomodoroClass === 'pomodoro_break' ? pomodoroTypeEnum.BREAK : pomodoroTypeEnum.SESSION; // can be either break or session

    var create = function() {
        var pomodoroHtml = String.format("\
            <div class='pomodoro_control'> \
                <div class='{0}'> \
                    <span> - </span> \
                    <span><input type='text'></input></span> \
                    <span> + </span> \
                 </div> \
            </div>", pomodoroClass);
        
        return pomodoroHtml;
        
    }

    var setControlEvents = function() {
        $(pomodoroClassSelector + ' input').keypress(function() {
            
        });
    }

    var setup = function() {
    }

    return {
        create: create,
        setControlEvents: setControlEvents
    }
}