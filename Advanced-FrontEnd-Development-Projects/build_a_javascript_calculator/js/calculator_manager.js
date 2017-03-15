function CalculatorManager(calcClass) {
    var calcClass = '.' + calcClass;
    var resultCalculated = false;
    var historyText = "";
    var resultText = "";
    var operatorReset = false;
    var readDecimal = false;
    var firstRead = true;              
    var numOfDigits = 0;
    var maxDigits = 20;
    var ps = PostfixManager();        

    this.init = function() {
        resultCalculated = false;
        historyText = "";
        resultText = "";
        operatorReset = false;
        readDecimal = false;
        firstRead = true;
        initHistory();
        initResult(); 
        ps.clearAll();        
    }     
    
    this.registerButtonClick = function() {
        console.log(this);
        var initref = this.init;
        $(calcClass + ' button').click(function(e) {
            var val = e.target.value;

            if(val === 'c') {
                initref();
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

                    if (!validateOperandInsertion(val)) return;
                    if (isDot(val)) {
                        readDecimal = true;
                        operatorReset = false;
                    }

                    if(resultCalculated) {
                        historyText = "";
                        clearHistory();
                        operatorReset = false;
                    
                    }          

                    firstRead = false;
                    operatorReset = true;
                    ps.postfixBuildOperand(val);                    
                    updateCalculatorDisplay(val);
                }
            }
            
        });          
    }

    var validateOperandInsertion = function (val) {
        if(isDot(val) && readDecimal) return false;
        if(isZero(val) && firstRead) return false;

        return true;
    }

    var maxDigitsExceeded = function() {
        return $(calcClass + ' .answer').text() === "Max digits";
    }

    var updateCalculatorDisplayWithResult = function(res) {
        historyText = historyText + '=' + res;
        resultText = res;
        if(historyText.length > maxDigits) {
            $(calcClass + ' .answer').text("Max digits");
            $(calcClass + ' .history').text("");
        }
        else {            
            $(calcClass + ' .answer').text(resultText); 
            $(calcClass + ' .history').text(historyText);
            historyText = res;
            resultCalculated = true;
        }
    }

    var updateCalculatorDisplay = function(val) {
        console.log(calcClass);
        historyText += val.toString();
        if(historyText.length > maxDigits) {
            $(calcClass + ' .answer').text("Max digits");
            $(calcClass + ' .history').text("");
        }
        else {
            $(calcClass + ' .answer').text(val);
            $(calcClass + ' .history').text(historyText);
            resultCalculated = false;
        }
    }

    var clearHistory = function() {
        historyText = "";
        $(calcClass + ' .history').text(historyText);
    }

    var initResult = function() {
        $(calcClass + ' .answer').text('0');
    }

    var initHistory = function() {
        $(calcClass + ' .history').text('0');
    }     

    // return {
    //     registerButtonClick: registerButtonClick,
    //     init: init
    // }
}