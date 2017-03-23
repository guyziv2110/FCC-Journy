var PomodoroControl = (function () {
    function PomodoroControl(pomodoroManager, pomodoroClass) {
        this.pomodoroManager = pomodoroManager;
    }

    PomodoroControl.prototype.setControlEvents = function() {
        var pomodoroControlRef = $(this.pomodoroClassSelector);
        var pomodoroValueSetter = this.setPomodoroValue;
        var pomodoroManagerRef = this.pomodoroManager;
        $(this.pomodoroClassSelector + ' input').keypress(function() {
            if(!pomodoroManagerRef.canSet()) return;
            pomodoroValueSetter();
        });
        $('.pomodoro_minus', pomodoroControlRef).click(function() {
            if(!pomodoroManagerRef.canSet()) return;
            var pomoValue = $('.pomodoro-value', pomodoroControlRef);
            var currentPomoValue = parseInt(pomoValue.val());
            pomoValue.val(currentPomoValue - 1);
            pomodoroValueSetter(pomoValue);
        });                
        $('.pomodoro_plus', pomodoroControlRef).click(function() {
            if(!pomodoroManagerRef.canSet()) return;
            var pomoValue = $('.pomodoro-value', pomodoroControlRef);
            var currentPomoValue = parseInt(pomoValue.val());
            pomoValue.val(currentPomoValue + 1);
            pomodoroValueSetter(pomoValue);
        });                   
                            
    }

    PomodoroControl.prototype.create = function () {
        var pomodoroHtml = String.format("\
            <div class='pomodoro_control'> \
                <div class='pomodoro_header'> \
                {0} \
                </div> \
                <div class='pomodoro-control-inputs {1}'> \
                    <span class='pomodoro_value_control pomodoro_minus'> - </span> \
                    <span><input class='pomodoro-value' type='text' value='{2}'></input></span> \
                    <span class='pomodoro_value_control pomodoro_plus'> + </span> \
                </div> \
            </div>", this.getControlHeader(), this.pomodoroClass, this.getDefaultControlValue());
        
        return pomodoroHtml;
    };

    return PomodoroControl;    
}());