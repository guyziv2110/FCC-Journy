function spinalCase(str) {
  var reg = /\s+|_+/g;
  
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return str.replace(reg, '-').toLowerCase();
}

console.log(spinalCase('This Is Spinal Tap'));
console.log(spinalCase("thisIsSpinalTap"));
