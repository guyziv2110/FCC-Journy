function sumFromTo(min, max) {
  return (max - min + 1) * ((max + min) / 2);
  
}

function sumAll(arr) {
  return sumFromTo(Math.min(...arr), Math.max(...arr));
}

sumAll([1, 4]);