$(document).ready(function() {
    appInit();
});

function appInit() {
    return function() {
        var c1 = new Calculator();
        console.log(c1);
        var expression = [];
        var operators = [];
        var exp = "";
        
        var operatorFunc = {
            '+': function(a, b) {return c1.add(a,  b);},
            '-': function(a, b) {return c1.subtract(a, b);},
            '*': function(a, b) {return c1.mul(a, b);},
            '/': function(a, b) {return c1.div(a, b);}
        };

        $('button').click(function(e) {
            var val = e.target.value;

            if(val === '=') {
                if (exp) {
                    expression.push(parseInt(exp)); 
                    exp = "";
                }
                while (operators.length > 0) {
                    var op = operators.pop();
                    expression.push(op);
                }         

                var res = calcPostfixExpression(expression);
                console.log(res);
            }
            
            else if (isOperator(val)) {
               
                if (exp) {
                    expression.push(parseInt(exp)); 
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



                    console.log(operators);
                    console.log(expression);                    
                }

            }
            else if(isOperand(val)) {
                exp += val;
            }
            
        });    

        function isOperator(v) {
            if (v === '-' || v === '+' || v === '*' || v === '/')
                return true;
            return false;
        }

        function isOperand(v) {
            var re = /^\d+$/;
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


      
    }();
}
   

