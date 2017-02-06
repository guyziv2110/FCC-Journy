
function diffArray(arr1, arr2) {
  return arr1
          .filter(item => !arr2.includes(item))
          .concat(arr2.filter(item => !arr1.includes(item)));
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);