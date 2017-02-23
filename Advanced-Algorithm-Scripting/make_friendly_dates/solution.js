function makeFriendlyDates(arr) {
  var startDateValues = arr[0].split('-');
  var endDateValues = arr[1].split('-');

  var getYear = (year, otherYear) => year === otherYear ? '' : year;
  var getMonth = (month, otherMonth) => month === otherMonth ? '' : year;


  
  return arr;
}

makeFriendlyDates(['2016-07-01', '2016-07-04']);