var operatorFunc = {
    '+': function(c, a, b) {return c.add(a,  b);},
    '-': function(c, a, b) {return c.subtract(a, b);},
    '*': function(c, a, b) {return c.mul(a, b);},
    '/': function(c, a, b) {return c.div(a, b);}
};

function isOperator(v) {
    if (v === '-' || v === '+' || v === '*' || v === '/')
        return true;
    return false;
}

function isOperand(v) {
    var re = /^(\.)?(-\d+)?\d*(\.\d+)?$/;
    return re.test(v);
}

function isDot(v) {
    return v === '.';
}

function isZero(v) {
    return v === '0';
}