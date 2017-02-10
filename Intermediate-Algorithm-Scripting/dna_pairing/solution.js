function pairElement(str) {
  var basePairs = [];
  var elementsToPair = str.split("");
  var pairElementsMapping = {C: 'G', G: 'C', T: 'A', A: 'T'};

  for(var i = 0; i < elementsToPair.length; i++) {
    basePairs.push([elementsToPair[i], pairElementsMapping[elementsToPair[i]]]);
  }

  return basePairs;
}

pairElement("GCG");
