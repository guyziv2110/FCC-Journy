/* client id = e6chpbil9u09n2xi2yg8uj5mxzmum8 */
/* featured link = https://api.twitch.tv/kraken/streams/featured?limit=5&client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8 */


/* channel info = 
without stream:
'https://api.twitch.tv/kraken/streams/shoryuken_this/?client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8

with stream:
https://api.twitch.tv/kraken/streams/esl_sc2/?client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8
*/

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

$(document).ready(function() {
    populateFaveStreamersList();

});

function populateFaveStreamersList() {
    var faveStreamersChannels = ['1', '2', '3','4', '5', '6', '7', '8', '9', 'a1', 'a2', 'a3'];
    faveStreamersChannels = faveStreamersChannels.concat(['1', '2', '3','4', '5', '6', '7', '8', '9', 'a1', 'a2', 'a3']);
    for (var i = 0; i < faveStreamersChannels.length; i++) {
        var channel = faveStreamersChannels[i];
        appendFaveStreamerToList(channel);
    }    
}

function appendFaveStreamerToList(channel) {
    var appended = String.format("\
    <li class='fav-streamer' id='fav-streamer-{0}'> \
        <a class='link-{0}' href='#'>{0}</a>\
        <span class='delete-fave-stream' id='delete-{0}'> \
            <i class='fa fa-video-camera' aria-hidden='true'></i> \
        </span> \
    </li>", channel);

    $('#fav-streamers-list').append(appended);
}