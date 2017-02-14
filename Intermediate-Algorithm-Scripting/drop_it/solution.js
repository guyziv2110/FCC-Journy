function dropElements(arr, func) {
  while(arr.length > 0 && !func(arr[0]))
    arr.shift();

  return arr;
}

dropElements([1, 2, 3], function(n) {return n < 3; });
dropElements([0, 1, 0, 1], function(n) {return n === 1;});
dropElements([1, 2, 3, 4], function(n) {return n >= 3;});