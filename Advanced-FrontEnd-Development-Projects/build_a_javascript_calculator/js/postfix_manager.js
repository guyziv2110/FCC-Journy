function PostfixManager() {
    var c1 = new Calculator();
    var expression = [];
    var operators = [];
    var exp = "";
    // should be sent as paramter to calcPostfix instead of being declared here
    // postfix manager should not know how to calculate.
    // it should be generic outside this function.
        
    var postfixBuildOperator = function(val) {
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
        return (expression.length > operators.length);
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
                c = operatorFunc[k](c1, a, b);
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
    // postfix should recieve callback to change UI and not handling it by itself
}