/*
    UI should only contain UI functions and operator functions
    HTML Builder
*/

$(document).ready(function() {
    var cl = calculatorLayoutHelper();
    

    $('.calculators div').each(function() {
        var calcClass = $(this).attr('class');
        $(this).append(cl.buildCalculatorLayout(calcClass));
        var cm = new calculatorManager(calcClass);
        cm.init();
        cm.registerButtonClick();            
    });

 

    appInit();
});

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

        
       
      
    }();
}

