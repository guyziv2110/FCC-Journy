var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var CURRENT_YEAR = 2016;

function makeFriendlyDates(arr) {
  var startDateValues = arr[0].split('-');
  var endDateValues = arr[1].split('-');

  var startDateObject = getDateObject(startDateValues);
  var endDateObject = getDateObject(endDateValues);

  if (isSameDates(startDateObject, endDateObject))
    return [buildFriendlyResult(startDateObject.year, startDateObject.month, startDateObject.day)];
  if (monthsDiff(endDateObject, startDateObject) === 0 && dayDiff(endDateObject, startDateObject) > 0)
    return [buildFriendlyResult("", startDateObject.month, startDateObject.day),
            buildFriendlyResult("", "", endDateObject.day)];
  else if (CURRENT_YEAR === startDateObject.year && monthsDiff(endDateObject, startDateObject) <= 12) 
    return [buildFriendlyResult("", startDateObject.month, startDateObject.day),
            buildFriendlyResult("", endDateObject.month, endDateObject.day)];
  else if (monthsDiff(endDateObject, startDateObject) <= 12 && dayDiff(endDateObject, startDateObject) < 0)
    return [buildFriendlyResult(startDateObject.year, startDateObject.month, startDateObject.day),
            buildFriendlyResult("", endDateObject.month, endDateObject.day)];           
  else if (monthsDiff(endDateObject, startDateObject) < 12)
    return [buildFriendlyResult(startDateObject.year, startDateObject.month, startDateObject.day),
            buildFriendlyResult("", endDateObject.month, endDateObject.day)];

  return [buildFriendlyResult(startDateObject.year, startDateObject.month, startDateObject.day), 
          buildFriendlyResult(endDateObject.year, endDateObject.month, endDateObject.day)];
}

function monthsDiff(date, otherDate) {
  let diff = date.month - otherDate.month
              + (12 * (date.year - otherDate.year));
  return diff;
}

function dayDiff(date, otherDate) {
  return date.day - otherDate.day;
}

function isSameDates (date, otherDate) {
  if(date.year === otherDate.year &&
    date.month === otherDate.month &&
    date.day === otherDate.day) return true;

  return false;
}

function buildFriendlyDay(day) {
  var dayNum = parseInt(day);

  switch(dayNum) {
    case 1:
    case 21:
    case 31:
      return dayNum + 'st';
    case 2:
    case 22:
      return dayNum + 'nd';
    case 3:
    case 23:
      return dayNum + 'rd';
    default:
      return dayNum + 'th';
  }
}


function buildFriendlyMonth(month) {
  var monthNum = parseInt(month);
  return months[monthNum - 1];

}

function getDateObject(dateValues) {
  var dateObject = {};
  var date = new Date(dateValues);
  dateObject.year = date.getFullYear();
  dateObject.month = date.getMonth() + 1;
  dateObject.day = date.getDate();

  return dateObject;
}

function buildFriendlyResult(year, month, day) {
  var str = "";

  if (month !== "") {
    str += buildFriendlyMonth(month) + " " + buildFriendlyDay(day);
  }
  else {
    str += buildFriendlyDay(day);
  }

  if (year !== "") {
    str += ', ' + year;
  }

  return str;
}

console.log(makeFriendlyDates(["2016-07-01", "2018-07-04"]));
console.log(makeFriendlyDates(['2016-07-01', '2016-07-04']));
console.log(makeFriendlyDates(["2016-12-01", "2017-02-03"]));
console.log(makeFriendlyDates(["2016-12-01", "2018-02-03"]));
console.log(makeFriendlyDates(["2017-03-01", "2017-05-05"]));
console.log(makeFriendlyDates(["2018-01-13", "2018-01-13"]));
console.log(makeFriendlyDates(["2022-09-05", "2023-09-04"]));
console.log(makeFriendlyDates(["2022-09-05", "2023-09-05"]));