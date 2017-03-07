$(document).ready(function() {
    appInit();
});

function appInit() {
    return function() {
        var c1 = new Calculator();
        var expression = [];
        var operators = [];
        

        $('button').click(function(e) {
            var val = e.target.value;

            if(val === '=') {
                while (operators.length > 0) {
                    var op = operators.pop();
                    expression.push(op);
                }                
                console.log(expression);
            }
            
            else if (isOperator(val)) {
                var topOperator = operators.length > 1 ? operators[operators.length-1] : null;
                if ((topOperator === '+' || topOperator === '-') &&
                    val === '/' || val === '*')
                    operators.push(val);
                else if (topOperator === null)
                    operators.push(val);
                else {
                    while (operators.length > 0) {
                        var op = operators.pop();
                        expression.push(op);
                    }

                    operators.push(val);
                }

            }
            else if(isOperand(val)) {
                expression.push(val);
            }
            
        });    

        function isOperator(v) {
            if (v === '-' || v === '+' || v === '*' || v === '/')
                return true;
            return false;
        }

        function isOperand(v) {
            var re = /^\d$/;
            return re.test(v);
        }

    }();
}
   

