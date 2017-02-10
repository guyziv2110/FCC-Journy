function uniteUnique(arr) {
  var args = [].slice.call(arguments); // or using Array.prototype.slice.call(arguments);
 
  return args.reduce((prev, next) => {
      return prev.concat(next.filter((el) => !prev.includes(el)));
  }, []);
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
uniteUnique([1, 3, 2], [1, [5]], [2, [4]]);
uniteUnique([1, 2, 3], [5, 2, 1]);
uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]);