function makeFriendlyDates(arr) {
  var startDateValues = arr[0].split('-');
  var endDateValues = arr[1].split('-');

  var getYear = (year, otherYear) => year === otherYear ? '' : year;
  var getMonth = (month, otherMonth) => month === otherMonth ? '' : year;

  var startYear = startDateValues[0];
  var endYear = endDateValues[0];

  var startMonth = startDateValues[1];
  var endMonth = endDateValues[1];

  var startDay = startDateValues[2];
  var endDay = endDateValues[2];

  if (startYear === endYear) endYear = "";
  if (startMonth === endMonth) endMonth = "";


  var startFriendlyDate = buildFriendlyResult(startYear, startMonth, startDay);
  var endFriendlyDate = buildFriendlyResult(endYear, endMonth, endDay);
  
  
  return arr;
}

function buildFriendlyResult(year, month, day) {
  var str = "";
  if (month !== "") {
    str += month + " " + day;
  }
  else {
    str += day;
  }

  if (year !== "") {
    str += ', ' + year;
  }

  return str;
}

makeFriendlyDates(['2016-07-01', '2016-07-04']);