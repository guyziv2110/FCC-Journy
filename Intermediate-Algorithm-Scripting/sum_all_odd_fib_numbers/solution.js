function sumFibs(num) {
  var fibs = fib(num);

  return fibs.reduce((prev, next) => {
    return next % 2 !== 0 ? prev += next : prev;
  }, 0);
}

function fib(num) {
    var fibArr = [1];

    for(var i = 1; i <=num;) {
        fibArr.push(i);
        i = fibArr[fibArr.length - 1] + fibArr[fibArr.length - 2];
    }

    return fibArr;
}

sumFibs(4);
