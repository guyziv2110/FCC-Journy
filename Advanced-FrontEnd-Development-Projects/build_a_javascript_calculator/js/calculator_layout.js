function calculatorLayoutHelper() {
    buildCalculatorLayout = function(calculatorName) {
        var calcHtml = String.format("\
            <div class='{0} calculator text-right'> \
                <div class='calc-name'>Calculator {0}</div> \
                <div class='title text-center'> \
                    <h5>FCC CALCULATOR</h5> \
                </div> \
            <div class='result-panel text-right'> \
                <div class='result'> \
                    <p class='answer'>0</p> \
                </div> \
                <div class='history'> \
                    <p>0</p> \
                </div> \
            </div> \
            <div class='buttons'> \
                <button value='7'>7</button> \
                <button value='8'>8</button> \
                <button value='9'>9</button> \
                <button value='/'>&divide;</button> \
                \
                <button value='4'>4</button> \
                <button value='5'>5</button> \
                <button value='6'>6</button> \
                <button value='*'>x</button> \
                \
                <button value='1'>1</button> \
                <button value='2'>2</button> \
                <button value='3'>3</button> \
                <button value='-'>-</button> \
                \
                <button value='0'>0</button> \
                <button value='.'>.</button> \
                <button class='orange' value='c'>c</button> \
                <button value='+'>+</button> \
                \
                <button class='equal-btn' value='='>=</button> \
            </div> \
        </div> ", calculatorName);

        return calcHtml;
    }

    return {
        buildCalculatorLayout: buildCalculatorLayout
    }

}