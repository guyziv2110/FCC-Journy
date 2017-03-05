
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

    return Calculator;
    
})();

var c1 = new Calculator();
var c2 = new Calculator();

c1.add(5, 6);
c2.add(2, 3);

console.log(c1.getResult());
console.log(c2.getResult());