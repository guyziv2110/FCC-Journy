function calculatorNavigator(itemsLength, currentItemIndex) {
    var showNext = function() {
        if(currentItemIndex < itemsLength - 1) {
            $('.calculators').children().eq(currentItemIndex).hide();
            currentItemIndex++;
            $('.prev-calc').fadeIn(400);
            if(currentItemIndex === itemsLength - 1)
                $('.next-calc').fadeOut(400);
            $('.calculators').children().eq(currentItemIndex).show();
            $('.calculators').children().eq(currentItemIndex).find('button').focus();
        }
    }


    var showPrev = function() {
        if (currentItemIndex > 0) {
            $('.calculators').children().eq(currentItemIndex).hide();
            currentItemIndex--;
            $('.next-calc').fadeIn(400);
            if(currentItemIndex === 0)
                $('.prev-calc').fadeOut(400);
            $('.calculators').children().eq(currentItemIndex).show();
            $('.calculators').children().eq(currentItemIndex).find('button').focus();
        }
    }

    return {
        showNext: showNext,
        showPrev: showPrev
    }
}