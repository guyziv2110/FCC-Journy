function pairwise(arr, arg) {
  var map = new Map();

  for (var i = 0; i < arr.length; i++) {
      if (map.has(arr[i])) {
          var m = map.get(arr[i]);
          m.count ++;
          m.index.push(i);
          map.set(arr[i], m);
      }
      else {
          map.set(arr[i], {index: [i], count:1}); // index + ref to pair
      }
  }

  for (var i = 0; i < arr.length; i++) {
      var val = arg - arr[i];
      var refItem = arr[i];

      if (map.has(val)) {
          var mapval = map.get(val);
          if (mapval.count === 1 && val !== refItem) {
            mapval.count--;
            var indexref = (mapval.index.pop());
            map.set(val, [indexref, refItem]);
          }
          else if(mapval.count > 1){
             var indexref = mapval.index.shift();
             var nextref = mapval.index.shift();
             map.set(val, [indexref, refItem, nextref]);
          }
      }
  }

  var indexSum = 0;
  for (var [k,v] of map) {
      if (v.length > 1) {
          var pairIndex = map.get(v[1]);
          var pairIndexValue = pairIndex[0];

          if(pairIndex.length > 2) 
              pairIndexValue += pairIndex[2];
          
          indexSum += pairIndexValue;
      }
  }

  return indexSum;
}

console.log(pairwise([1, 1, 1], 2));
console.log(pairwise([1,4,2,3,0,5], 7));
console.log(pairwise([1, 3, 2, 4], 4));
console.log(pairwise([0, 0, 0, 0, 1, 1], 1));
console.log(pairwise([], 100));
console.log(pairwise([7, 9, 11, 13, 15], 20));
console.log(pairwise([1, 3, 2, 4], 4));
console.log(pairwise([1, 2, 1, 3, 2], 4));