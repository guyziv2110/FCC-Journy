/*
    UI should only contain UI functions and operator functions
    HTML Builder
*/

$(document).ready(function() {
    appInit();
});

function appInit() {
    return function() {
        var c1 = new Calculator();

        var historyText = "";
        var resultText = "";
        var resultCalculated = false;
        var expression = [];
        var operators = [];
        var exp = "";
        var operatorReset = false;
        
        var operatorFunc = {
            '+': function(a, b) {return c1.add(a,  b);},
            '-': function(a, b) {return c1.subtract(a, b);},
            '*': function(a, b) {return c1.mul(a, b);},
            '/': function(a, b) {return c1.div(a, b);}
        };

        $('button').click(function(e) {
            var val = e.target.value;

            if(val === '=') {
                // postfix_manager calculateresult(updateCalculatorDisplayWithResult)
                if(!isOperand(exp)) return;
                if (exp) {
                    expression.push(parseInt(exp)); 
                    exp = "";
                }
                while (operators.length > 0) {
                    var op = operators.pop();
                    expression.push(op);
                }         

                var res = calcPostfixExpression(expression);
                res = parseFloat(res.toFixed(2));
                updateCalculatorDisplayWithResult(res);
                expression.push(res);
                console.log(res);
            }
            
            else {
                // postfix_manager build_operator(updateCalculatorDisplay)
                if (isOperator(val) && operatorReset) {
                    updateCalculatorDisplay(val);
                    operatorReset = false;
                    if (exp) {
                        expression.push(parseFloat(exp)); 
                        exp = "";
                    }

                    var topOperator = operators.length > 0 ? operators[operators.length-1] : null;                   
                    if ((topOperator === '+' || topOperator === '-') &&
                        val === '/' || val === '*') {
                        operators.push(val);
                        console.log(operators);
                    }
                    else if (topOperator === null) {
                        operators.push(val);
                        console.log(operators);
                    }
                    else {
                        while (operators.length > 0) {
                            var op = operators.pop();
                            expression.push(op);
                        }

                        operators.push(val);                   
                    }

                }
                else if(isOperand(val)) {
                    // postfix_manager build_operand(updateCalculatorDisplay)
                    // think about clearing the history. // make it coherent
                    if(resultCalculated) {
                        clearHistory();
                    }
                    
                    exp += val;
                    operatorReset = true;
                    updateCalculatorDisplay(val);
                }
            }
            
        });    

        function isOperator(v) {
            if (v === '-' || v === '+' || v === '*' || v === '/')
                return true;
            return false;
        }

        function isOperand(v) {
            var re = /^(\.)?(-\d+)?\d*(\.\d+)?$/;
            return re.test(v);
        }

        function calcPostfixExpression(exp) {
            var k;
            var a, b, c;
            var expstack = [];

            while (exp.length) {
                k = exp.shift();
                if (isOperand(k))
                    expstack.push(k);
                else {
                    b = expstack.pop()
                    a = expstack.pop();
                    c = operatorFunc[k](a, b);
                    expstack.push(c);
                }
            }

            return expstack.pop();
        }

        function updateCalculatorDisplayWithResult(res) {
            historyText = historyText + '=' + res;
            resultText = res;
            $('.answer').text(resultText); 
            $('.history').text(historyText);
            historyText = res;
            resultCalculated = true;
        }

        function updateCalculatorDisplay(val) {
            historyText += val;
            $('.answer').text(val);
            $('.history').text(historyText);
            resultCalculated = false;
        }

        function clearHistory() {
            historyText = "";
            $('.history').text(historyText);
        }
      
    }();
}

