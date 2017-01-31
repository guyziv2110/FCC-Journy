/* client id = e6chpbil9u09n2xi2yg8uj5mxzmum8 */
/* featured link = https://api.twitch.tv/kraken/streams/featured?limit=5&client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8 */


/* channel info = 
without stream:
'https://api.twitch.tv/kraken/streams/shoryuken_this/?client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8

with stream:
https://api.twitch.tv/kraken/streams/esl_sc2/?client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8
*/

function resizeHandler(windowWidth) {
    if (windowWidth > 850) {
        $('.channels-panel').removeClass('closed');
    } else if (windowWidth <= 850) {
        $('.channels-panel').addClass('closed');
    }
}

$(window).resize(function() {
    resizeHandler($(window).width());
});