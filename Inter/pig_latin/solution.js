function translatePigLatin(str) {
  if(!isConsonant(str.charAt(0))) 
    return str + "way";
  else {
    var strArr = str.split("");
    var strRes = [];
    while(isConsonant(strArr[0])) {
      var first = strArr.shift();
      strRes.push(first);
    }

    return strArr.join("") + strRes.join("") + "ay";
  }
}

function isConsonant(ch) {
  return !/[aeiou]/.test(ch);
}

console.log(translatePigLatin("consonant"));
console.log(translatePigLatin("california"));
console.log(translatePigLatin("paragraphs"));
console.log(translatePigLatin("glove"));
console.log(translatePigLatin("algorithm"));
console.log(translatePigLatin("eight"));
