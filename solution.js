// first solution (only first word casing is treated)
function myReplace_0(str, before, after) {
  if(before.charAt(0) === before.charAt(0).toUpperCase()) 
        after = after.charAt(0).toUpperCase() + after.slice(1);
  return str.replace(before, after);
}

// second solution (all the string casing is treated)
function caseAdapter(before, after) {
  var beforeCase = before.split("");
  var afterCase = after.split("");

  for(var i = 0; i < Math.min(before.length, after.length); i++) {
     if(before.charAt(i) === before.charAt(i).toUpperCase())
        afterCase[i] = afterCase[i].toUpperCase();
     else
        afterCase[i] = afterCase[i].toLowerCase();
  }

  return afterCase.join("");
}

function myReplace(str, before, after) {
  return str.replace(before, caseAdapter(before, after));
}

console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));
console.log(myReplace("His name is ToW", "ToW", "jDhn"));