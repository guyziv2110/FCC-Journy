function CalculatorManager(calcClass) {
    var calcClass = '.' + calcClass;
    var resultCalculated = false;
    var historyText = "";
    var resultText = "";
    var operatorReset = false;
    var readDecimal = false;
    var firstRead = true;              
    var maxDigits = 20;
    var calculator = new Calculator();
    var operandReset = true;
    var MAX_DIGITS_ERROR = "Max digits";
    var ps = postfixManager(calculator);        

    this.init = function() {
        registerKeyPress();
        registerButtonClick();        
        pInit();
    }     

    var pInit = function() {
        resultCalculated = false;
        historyText = "";
        resultText = "";
        operatorReset = false;
        operandReset = true;
        readDecimal = false;
        firstRead = true;   
        initHistory();
        initResult(); 
        ps.clearAll();  
    }
    
    var registerKeyPress = function() {
        $(calcClass + ' button').keypress(function(event){
            if(!isNaN(String.fromCharCode(event.which))){
                event.preventDefault();
                handleInput(event.key);
            }

            if(event.key === '-' || event.key === '+' || event.key === '*' || event.key === '/'){
                event.preventDefault();
                handleInput(event.key);
            }

            if(event.which === 13){
                event.preventDefault();
                handleInput("=");
            }                           
        });
    }

    var registerButtonClick = function() {        
        $(calcClass + ' button').click(function(e) {
            var val = e.target.value;
            handleInput(val);            
        });          
    }

    var handleInput = function(val) {
        var initref = pInit;
        if(val === 'c') {
            initref();
        }

        if(val === '=') {
            var res = ps.postfixBuildResult(val);
            if(res !== false) {
                readDecimal = false;
                operandReset = true;
                firstRead = true;
                res = parseFloat(res.toFixed(2));
                updateCalculatorDisplayWithResult(res);
            }
        }
        
        else {
            if (isOperator(val) && operatorReset) {
                readDecimal = false;
                operandReset = true;
                firstRead = true;
                updateCalculatorDisplay(val);
                operatorReset = false;
                ps.postfixBuildOperator(val);
            }
            else if(isOperand(val) && operandReset) {
                if(maxDigitsExceeded()) {
                    initref();
                }

                if(isZero(val) && firstRead) {
                    operandReset = false;
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
    }

    var validateOperandInsertion = function (val) {
        if(isDot(val) && readDecimal) return false;
        return true;
    }

    var maxDigitsExceeded = function() {
        return $(calcClass + ' .answer').text() === MAX_DIGITS_ERROR;
    }

    var updateCalculatorDisplayWithResult = function(res) {
        historyText = historyText + '=' + res;
        resultText = res;
        if(historyText.length > maxDigits) {
            $(calcClass + ' .answer').text(MAX_DIGITS_ERROR);
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
        historyText += val.toString();
        if(historyText.length > maxDigits) {
            $(calcClass + ' .answer').text(MAX_DIGITS_ERROR);
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
}