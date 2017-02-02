/* client id = e6chpbil9u09n2xi2yg8uj5mxzmum8 */
/* featured link = https://api.twitch.tv/kraken/streams/featured?limit=5&client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8 */


/* channel info = 
without stream:
'https://api.twitch.tv/kraken/streams/shoryuken_this/?client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8

with stream:
https://api.twitch.tv/kraken/streams/esl_sc2/?client_id=e6chpbil9u09n2xi2yg8uj5mxzmum8
*/

var userFaveStreamersChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "brunofin", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "amouranth", "slothtimelord", "thehypercraft", "comster404"];
var clientKey = 'e6chpbil9u09n2xi2yg8uj5mxzmum8';

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
    fetchFaveStreamersChannels();
});


function fetchFaveStreamersChannels() {
    for (var i = 0; i < userFaveStreamersChannels.length; i++) {
        var channel = userFaveStreamersChannels[i];
        fetchChannel(channel);
    }
}

function fetchChannel(channel) {
    var channelUrl = 'https://api.twitch.tv/kraken/streams/' + channel + '/?client_id=' + clientKey;
    var fetchPromise = fetch(channelUrl);

    fetchPromise.done(function(res) {
        parseApiResponse(channel, res);
    });
}

function fetch(channelUrl) {
    return $.ajax({
        url: channelUrl
    });
}

function parseApiResponse(channel, res) {
    if(res === undefined || res === null) {
        $('#fav-streamer-' + channel).addClass('not-found');
    }
    else if(res.stream === null) {
        $('#fav-streamer-' + channel).addClass('offline');
    }
    else {
        $('#fav-streamer-' + channel).addClass('online');
    }
}

function populateFaveStreamersList() {
    for (var i = 0; i < userFaveStreamersChannels.length; i++) {
        var channel = userFaveStreamersChannels[i];
        appendFaveStreamerToList(channel);
    }    
}

function appendFaveStreamerToList(channel) {
    var appended = String.format("\
    <li class='fav-streamer' id='fav-streamer-{0}'> \
        <a class='link-{0}' href='#'>{0}</a>\
        <span class='delete-fave-stream' id='delete-{0}'> \
            <i class='fa fa-trash-o' aria-hidden='true'></i> \
        </span> \
    </li>", channel);

    $('#fav-streamers-list').append(appended);
}