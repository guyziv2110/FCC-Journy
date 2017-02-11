function convertHTML(str) {
  var htmlEntitiesMap = {
    '&' : '&amp;',
    '<' : '&lt;',
    '>' : '&gt;',
    '"' : '&quot;', 
    "'" : '&apos;'
  };  

  var mappingEntites = Object.keys(htmlEntitiesMap).map(function(k){return k;});  
  var htmlEntitiesRe = new RegExp("(["+ mappingEntites +"])", "g");

  return str.replace(htmlEntitiesRe, function (match) {return htmlEntitiesMap[match];});
}

console.log(convertHTML("Dolce & Gabbana"));
console.log(convertHTML("Hamburgers < Pizza < Tacos"));
console.log(convertHTML("Sixty > twelve"));
console.log(convertHTML('Stuff in "quotation marks"'));
console.log(convertHTML("Shindler's List"));
console.log(convertHTML("<>"));