
var Calculator = (function () {
    var Calculator = function() {
        this.result = 0;

        this.getResult = function() {
            return this.result;
        }
    }

    Calculator.prototype.add = function(x, y) {
        this.result = x + y;
    }

    Calculator.prototype.subtract = function(x, y) {
        this.result = x - y;
    }

    Calculator.prototype.mul = function(x, y) {
        this.result = x * y;
    }

    Calculator.prototype.div = function(x, y) {
        this.result = x / y;
    }

    return Calculator;
    
})();