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
        var resultCalculated = false;
        var historyText = "";
        var resultText = "";
        var operatorReset = false;
        var ps = PostfixManager();
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
                var res = ps.postfixBuildResult(val);
                if(res) {
                    res = parseFloat(res.toFixed(2));
                    updateCalculatorDisplayWithResult(res);
                    console.log(res);
                }
            }
            
            else {
                // postfix_manager build_operator(updateCalculatorDisplay)
                if (isOperator(val) && operatorReset) {
                    updateCalculatorDisplay(val);
                    operatorReset = false;
                    ps.postfixBuildOperator(val);
                }
                else if(isOperand(val)) {
                    // postfix_manager build_operand(updateCalculatorDisplay)
                    // think about clearing the history. // make it coherent
                    if(resultCalculated) {
                        clearHistory();
                    }
                    
                    ps.postfixBuildOperand(val);

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

