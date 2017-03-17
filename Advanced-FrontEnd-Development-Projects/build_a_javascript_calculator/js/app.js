$(document).ready(function() {
    var cl = calculatorLayoutHelper();

    $('.calculators div').each(function() {
        var calcClass = $(this).attr('class');
        $(this).append(cl.buildCalculatorLayout(calcClass));
        var cm = new CalculatorManager(calcClass);
        cm.init();          
        $(this).hide();
    });

    appInit();
});

function showNextCalc(calcNavigator) {
  calcNavigator.showNext();
}

function showPrevCalc(calcNavigator) {
  calcNavigator.showPrev();
}

function appInit() {
    return function() {
      var calcNavigator = calculatorNavigator($('.calculators>div').length, 0);
      $('.calculators div:first').show();
      $('.calculators div:first button').focus();
      $('#next-calc').click(showNextCalc.bind(this, calcNavigator));  
      $('#prev-calc').click(showPrevCalc.bind(this, calcNavigator)); 
      if($('.calculators>div').length > 1)  
        $('.next-calc').show();
    }();
}

