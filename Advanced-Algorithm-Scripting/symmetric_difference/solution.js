function sym(args) {
  var arr = [].slice.call(arguments); // or using Array.prototype.slice.call(arguments);
  
  var differ = (A , B) => A.filter((el) => B.indexOf(el) === -1);
  var uniqueDiffer = (A, B) => {
      var dif =  differ(A, B).concat(differ(B, A));
      return dif.filter((el, pos) => dif.indexOf(el) === pos);
  };

  return arr.reduce(uniqueDiffer);
}

sym([1, 2, 3], [5, 2, 1, 4]);
sym([1, 2, 5], [2, 3, 5], [3, 4, 5]);