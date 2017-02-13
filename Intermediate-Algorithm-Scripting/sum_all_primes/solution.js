function sumPrimes(num) {
  var sum = 0;
  for (var i = 2; i <= num; i++) {
      if(isPrime(i))
        sum += i;
  }

  return sum;
}

function isPrime(num) {
  for(var i = 2; i <= Math.sqrt(num); i++) {
    if(num % i === 0)
      return false;
  }

  return true;
}

console.log(sumPrimes(10));
console.log(sumPrimes(977));
