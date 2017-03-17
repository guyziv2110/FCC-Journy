function postfixManager(calculator) {
    var expression = [];
    var operators = [];
    var exp = "";
        
    var postfixBuildOperator = function(val) {
        if (exp) {
            expression.push(parseFloat(exp)); 
            exp = "";
        }

        var topOperator = operators.length > 0 ? operators[operators.length-1] : null;                   
        if ((topOperator === '+' || topOperator === '-') &&
            val === '/' || val === '*') {
            operators.push(val);
        }
        else if (topOperator === null) {
            operators.push(val);
        }
        else {
            while (operators.length > 0) {
                var op = operators.pop();
                expression.push(op);
            }

            operators.push(val);                   
        }
    }

    var postfixBuildOperand = function(v) {
        exp += v;
    }

    var postfixBuildResult = function(v) {
        if(!isOperand(exp)) return false;

        if (exp) {
            expression.push(parseFloat(exp)); 
            exp = "";
        }

        if(!canBuildResult()) return false;
        
        while (operators.length > 0) {
            var op = operators.pop();
            expression.push(op);
        }     

        var res = calcPostfixExpression(expression);    
        expression.push(res);
        return res;
    }

    var canBuildResult = function() {
        var expressionNumberCount = countNumbers(expression);
        var expressionOperatorsCount = expression.length - countNumbers(expression);
        return (expressionNumberCount > expressionOperatorsCount + operators.length);
    }
    
    var calcPostfixExpression = function(exp) {
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
                c = operatorFunc[k](calculator, a, b);
                expstack.push(c);
            }
        }

        return expstack.pop();
    }

    var clearAll = function() {
        expression = [];
        operators = [];
        exp = "";
    }

    return {
        postfixBuildResult: postfixBuildResult,
        postfixBuildOperand: postfixBuildOperand,
        postfixBuildOperator: postfixBuildOperator,
        clearAll: clearAll
    }
}