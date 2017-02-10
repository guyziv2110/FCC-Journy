function fearNotLetter(str) {
  var missingChar;
  var currentCharCode, nextCodeChar;

  for(var i = 0; i < str.length; i++) {
    currentCharCode = str.charCodeAt(i);
    nextCodeChar = str.charCodeAt(0) + i;
    
    if(currentCharCode !== nextCodeChar) {
      return String.fromCharCode(currentCharCode - 1);
    }
  }
  return missingChar;
}

fearNotLetter("abce");