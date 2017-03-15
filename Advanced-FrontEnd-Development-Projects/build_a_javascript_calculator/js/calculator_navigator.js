function calculatorNavigator(items, currentItem) {
    var showNext = function() {
        if(currentItem < items - 1) {
            console.log('next');
            currentItem++;

            //show prev icon
            // handle show next calc (might use callback) where the currentItem
            // will be injected as param
        }
        else {
            // hide next icon
        }
    }


    var showPrev = function() {
        if (currentItem > 0) {
            currentItem--;
        }
    }

    return {
        showNext: showNext,
        showPrev: showPrev
    }
}