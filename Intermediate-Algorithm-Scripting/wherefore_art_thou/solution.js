
function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  
  var sourceKeys = Object.keys(source);

  arr = collection.filter(function (collObj) {
    return sourceKeys.every(function (key)  {
      return collObj.hasOwnProperty(key) && collObj[key] === source[key];
    });
  });

  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
