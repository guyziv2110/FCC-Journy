
var Calculator = (function () {
    var Calculator = function() {
    }

    Calculator.prototype.add = function(x, y) {
        return x + y;
    }

    Calculator.prototype.subtract = function(x, y) {
        return x - y;
    }

    Calculator.prototype.mul = function(x, y) {
        return x * y;
    }

    Calculator.prototype.div = function(x, y) {
        return x / y;
    }

    return Calculator;
    
})();