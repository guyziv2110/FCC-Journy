function pomodoroManager() {
    var setSession = function() {
        console.log('setSession called');
    }

    var setBreak = function() {
        console.log('setBreak called');
    }

    var start = function() {

    }

    return {
        setSession: setSession,
        setBreak: setBreak,
        start: start
    }
}