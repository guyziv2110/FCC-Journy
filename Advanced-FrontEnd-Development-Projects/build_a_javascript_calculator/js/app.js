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
        var readDecimal = false;
        var firstRead = true;
        var readDot = false;                 
        var numOfDigits = 0;
        var maxDigits = 20;
        var ps = PostfixManager();        

        var init = function() {
            resultCalculated = false;
            historyText = "";
            resultText = "";
            operatorReset = false;
            readDecimal = false;
            firstRead = true;
            readDot = false; 
            initHistory();
            initResult(); 
            ps.clearAll();        
        }

        init();
        
        $('button').click(function(e) {
            var val = e.target.value;

            if(val === 'c') {
                init();
                //initHistory();
            }

            if(val === '=') {
                // postfix_manager calculateresult(updateCalculatorDisplayWithResult)
                var res = ps.postfixBuildResult(val);
                if(res !== false) {
                    readDecimal = false;
                    firstRead = true;
                    res = parseFloat(res.toFixed(2));
                    updateCalculatorDisplayWithResult(res);
                    console.log(res);
                }
            }
            
            else {
                // postfix_manager build_operator(updateCalculatorDisplay)
                if (isOperator(val) && operatorReset) {
                    readDecimal = false;
                    firstRead = true;
                    updateCalculatorDisplay(val);
                    operatorReset = false;
                    ps.postfixBuildOperator(val);
                }
                else if(isOperand(val)) {
                    // postfix_manager build_operand(updateCalculatorDisplay)
                    // think about clearing the history. // make it coherent
                    if(maxDigitsExceeded()) {
                        init();
                    }

                    if(isDot(val) && readDecimal) return;
                    if(isZero(val) && firstRead) return;

                    firstRead = false;

                    if(resultCalculated) {
                        clearHistory();
                        operatorReset = false;
                    
                    }

                    if (val === '.') {
                        readDecimal = true;
                        operatorReset = false;
                        readDot = true;
                    }

                    ps.postfixBuildOperand(val);
                    operatorReset = true;
                    
                    updateCalculatorDisplay(val);
                }
            }
            
        });    

        function maxDigitsExceeded() {
            return $('.answer').text() === "Max digits";
        }

        function updateCalculatorDisplayWithResult(res) {
            historyText = historyText + '=' + res;
            resultText = res;
            if(historyText.length > maxDigits) {
                $('.answer').text("Max digits");
                $('.history').text("");
            }
            else {            
                $('.answer').text(resultText); 
                $('.history').text(historyText);
                historyText = res;
                resultCalculated = true;
            }
        }

        function updateCalculatorDisplay(val) {
            historyText += val.toString();
            if(historyText.length > maxDigits) {
                $('.answer').text("Max digits");
                $('.history').text("");
            }
            else {
                $('.answer').text(val);
                $('.history').text(historyText);
                resultCalculated = false;
            }
        }

        function clearHistory() {
            historyText = "";
            $('.history').text(historyText);
        }

        function initResult() {
            $('.answer').text('0');
        }

        function initHistory() {
            $('.history').text('0');
        }
      
    }();
}

