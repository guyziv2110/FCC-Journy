function PostfixManager() {
    var c1 = new Calculator();
    
    var expression = [];
    var operators = [];
    var exp = "";
    // should be sent as paramter to calcPostfix instead of being declared here
    // postfix manager should not know how to calculate.
    // it should be generic outside this function.
    var operatorFunc = {
        '+': function(a, b) {return c1.add(a,  b);},
        '-': function(a, b) {return c1.subtract(a, b);},
        '*': function(a, b) {return c1.mul(a, b);},
        '/': function(a, b) {return c1.div(a, b);}
    };
        
    postfixBuildOperator = function(val) {
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

    postfixBuildOperand = function(v) {
        exp += v;
    }

    postfixBuildResult = function(v) {
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

    canBuildResult = function() {
        return (expression.length > operators.length);
    }

    calcPostfixExpression = function(exp) {
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

    clearAll = function() {
        expression = [];
        operators = [];
        exp = "";
    }

    function isOperator(v) {
        if (v === '-' || v === '+' || v === '*' || v === '/')
            return true;
        return false;
    }

    function isOperand(v) {
        var re = /^(\.)?(-\d+)?\d*(\.\d+)?$/;
        return re.test(v);
    } 

    return {
        postfixBuildResult: postfixBuildResult,
        postfixBuildOperand: postfixBuildOperand,
        postfixBuildOperator: postfixBuildOperator,
        clearAll: clearAll
    }
    // postfix should recieve callback to change UI and not handling it by itself
}