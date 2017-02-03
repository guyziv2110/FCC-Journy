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
    if (windowWidth > 1040) {
        $('.channels-panel').removeClass('closed');
        $('.channel-featured-content').removeClass('full');
    } else if (windowWidth <= 1040) {
        $('.channels-panel').addClass('closed');
        $('.channel-featured-content').addClass('full');
    }
}

$(window).resize(function() {
    resizeHandler($(window).width());
});

$(document).ready(function() {
    resizeHandler($(window).width());
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
        console.log(res);
        parseApiResponse(channel, res);
    });
}

function fetch(channelUrl) {
    return $.ajax({
        url: channelUrl
    });
}

function buildFaveStreamersBoxes(channel, res) {
    var appended = String.format("\
    <div class='fav-box' id='fav-box-{0}'> \
        <div class='fav-box-preview-logo'> \
            <a id='link-{0}' href='{1}' target='_blank'> \
                <img src='{2}'></img> \
            </a>\
        </div> \
        <div class='fav-box-information'> \
            <div class='fav-box-channel-name'>{9}</div>\
            <div class='fav-box-game-name'>{3}</div>\
            <div class='fav-status'>{4}</div>\
            <hr class='additional-info-sep'> \
            <div class='additional-info'> \
                <div>{5}p, {6}</div>\
                <div>{7} fps</div>\
                <div>{8} viewers</div>\
            <\div> \
        </div> \
    </div>", channel, 
             "https://www.twitch.tv/" + channel, 
             res.stream.preview.large,
             res.stream.channel.game,
             res.stream.channel.status,
             res.stream.video_height,
             res.stream.channel.language,
             Math.round(res.stream.average_fps),
             res.stream.viewers,
             res.stream.channel.name );

    $('#fav-streamers-boxes-information').append(appended);
}

function parseApiResponse(channel, res) {
    if(res === undefined || res === null) {
        $('#fav-streamer-' + channel).addClass('not-found');
    }
    else if(res.stream === null) {
        $('#fav-streamer-' + channel).addClass('offline');
        $('#link-' + channel).attr('href', "https://www.twitch.tv/" + channel);
    }
    else {
        $('#fav-streamer-' + channel).addClass('online');
        $('#link-' + channel).attr('href', "https://www.twitch.tv/" + channel);
        buildFaveStreamersBoxes(channel, res);
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
        <a id='link-{0}' href='#' target='_blank'>{0}</a>\
        <span class='delete-fave-stream' id='delete-{0}'> \
            <i class='fa fa-trash-o' aria-hidden='true'></i> \
        </span> \
    </li>", channel);

    $('#fav-streamers-list').append(appended);
    $('#delete-' + channel).click(function() {
        removeChannelFromFaves(channel);
    });
}

function removeChannelFromFaves(channel) {
    var channelIndex = userFaveStreamersChannels.indexOf(channel);

    if(channelIndex > -1) {
        userFaveStreamersChannels.splice(channelIndex, 1);

        $("#fav-box-" + channel).fadeOut(220, function(){
            $(this).remove();
        });

        $("#fav-streamer-" + channel).fadeOut(220, function() {
            $(this).remove();
        });
    }
}

$('#channel-panel-handle').click(function() {
    $('.channels-panel').toggleClass('closed');
    $('.channel-featured-content').toggleClass('full');
});