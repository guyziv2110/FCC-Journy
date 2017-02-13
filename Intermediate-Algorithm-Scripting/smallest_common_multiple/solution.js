function smallestCommons(arr) {
  return smallestCommonsFromTo(Math.min(...arr), Math.max(...arr));
}

// Using Euclid's algorithm
function smallestCommonsFromTo(min, max) {
    var multiple = min;

    range(min, max).forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}

function range(min, max) {
    var arr = [];

    for (var i = min; i <= max; i++) {
        arr.push(i);
    }
    
    return arr;
}

function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);   
}

console.log(smallestCommons([1,5]));
