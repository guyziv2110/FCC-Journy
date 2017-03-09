function PostfixManager() {
    var c1 = new Calculator();

    // should be sent as paramter to calcPostfix instead of being declared here
    // postfix manager should not know how to calculate.
    // it should be generic outside this function.
    var operatorFunc = {
        '+': function(a, b) {return c1.add(a,  b);},
        '-': function(a, b) {return c1.subtract(a, b);},
        '*': function(a, b) {return c1.mul(a, b);},
        '/': function(a, b) {return c1.div(a, b);}
    };
        
    postfixBuilder = function(v) {
        if (v === "=") {}
        //if (isOperand...)
        //if (isOperator...)
    }

    // postfix should recieve callback to change UI and not handling it by itself
}