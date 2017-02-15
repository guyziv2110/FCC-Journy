function addTogether() {
  var args = [].slice.call(arguments);

  if(args.length > 2 || args.length === 0) return undefined;
  if(args.length === 1) {
    if(typeof(args[0]) !== 'number') return undefined;
    return function(b) {
        if(typeof(b) !== 'number') return undefined;
        return args[0] + b;
    }
  }
  else { // args.length === 2
    if(typeof(args[0]) !== 'number' ||
       typeof(args[1]) !== 'number') return undefined;
    return args[0] + args[1];
  }
}

console.log(addTogether(2,3));
console.log(addTogether(2)([3]));