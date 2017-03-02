function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var twoPI = 2 * Math.PI;
  

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    var itemAvgAlt = item.avgAlt;
    var r = earthRadius + itemAvgAlt;
    item.orbitalPeriod = Math.round(twoPI * Math.sqrt((Math.pow(r, 3)) / (GM)));

    delete item.avgAlt;
  };

  return arr;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);