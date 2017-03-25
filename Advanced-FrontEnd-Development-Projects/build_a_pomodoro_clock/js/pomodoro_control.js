var PomodoroControl = (function () {
    function PomodoroControl(pomodoroManager, pomodoroClass) {
        this.pomodoroManager = pomodoroManager;
    }

    PomodoroControl.prototype.setControlEvents = function() {
        var pomodoroControlRef = $(this.pomodoroClassSelector);
        var pomodoroValueSetter = this.setPomodoroValue;
        var pomodoroManagerRef = this.pomodoroManager;
        $('.pomodoro_minus', pomodoroControlRef).click(function() {
            if(!pomodoroManagerRef.canSet()) return;
            var pomoValue = $('.pomodoro-value', pomodoroControlRef);
            var currentPomoValue = parseInt(pomoValue.val());
            var newValue = currentPomoValue - 1;
            pomoValue.val(newValue);
            pomodoroValueSetter(newValue);
        });                
        $('.pomodoro_plus', pomodoroControlRef).click(function() {
            if(!pomodoroManagerRef.canSet()) return;
            var pomoValue = $('.pomodoro-value', pomodoroControlRef);
            var currentPomoValue = parseInt(pomoValue.val());
            var newValue = currentPomoValue + 1;
            pomoValue.val(newValue);
            pomodoroValueSetter(newValue);
        });                   
                            
    }

    PomodoroControl.prototype.create = function () {
        var pomodoroHtml = String.format("\
            <div class='pomodoro_control'> \
                <div class='pomodoro_header'> \
                {0} \
                </div> \
                <div class='noselect pomodoro-control-inputs {1}'> \
                    <span class='pomodoro_value_control pomodoro_minus'> - </span> \
                    <span><input disabled class='pomodoro-value' type='text' value='{2}'></input></span> \
                    <span class='pomodoro_value_control pomodoro_plus'> + </span> \
                </div> \
            </div>", this.getControlHeader(), this.pomodoroClass, this.getDefaultControlValue());
        
        return pomodoroHtml;
    };

    return PomodoroControl;    
}());