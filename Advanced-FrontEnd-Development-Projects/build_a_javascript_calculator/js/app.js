/*
    UI should only contain UI functions and operator functions
    HTML Builder
*/

$(document).ready(function() {
    var cl = calculatorLayoutHelper();
    var currentCalcToShow = 0;

    $('.calculators div').each(function() {
        var calcClass = $(this).attr('class');
        $(this).append(cl.buildCalculatorLayout(calcClass));
        var cm = new CalculatorManager(calcClass);
        cm.init();
        cm.registerButtonClick();            
        $(this).hide();
    });
    
    appInit();
});

// move to calc navigator as the num of calcs will be served to the function once
function showNextCalc() {
  // CalculatorNavigator.showNext();
  // CalculatorNavigator.showPrev();
}

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}

function appInit() {
    return function() {

      $('.calculators div:first').show();
      $('#next-calc').click(showNextCalc);        
       
      
    }();
}

