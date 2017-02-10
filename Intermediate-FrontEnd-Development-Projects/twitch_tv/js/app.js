var localStorageFaves = localStorage.getItem('localStorageFaves');
var defaultUserFaveStreamersChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "brunofin", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "amouranth", "slothtimelord", "thehypercraft", "comster404"];
var clientKey = 'e6chpbil9u09n2xi2yg8uj5mxzmum8';

$(window).resize(function() {
    resizeHandler($(window).width());
});

$(document).ready(function() {
    if(localStorageFaves === null || localStorageFaves.length === 0) {
        localStorage.setItem('localStorageFaves', JSON.stringify(defaultUserFaveStreamersChannels));
        userFaveStreamersChannels = JSON.parse(localStorage.getItem('localStorageFaves'));
    }
    else {
        userFaveStreamersChannels = JSON.parse(localStorage.getItem('localStorageFaves'));
    }    
    resizeHandler($(window).width());
    populateFaveStreamersList();
    fetchFaveStreamersChannels();
    prohibitAddingOptions();    
    onAddChannel();
    onClearStorage();
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

function resizeHandler(windowWidth) {
    if (windowWidth > 1040) {
        $('.channels-panel').removeClass('closed');
        $('.channel-featured-content').removeClass('full');
    } else if (windowWidth <= 1040) {
        $('.channels-panel').addClass('closed');
        $('.channel-featured-content').addClass('full');
    }
}

function addChannelHandler() {
    var channel = $(".channel-add input").val();
    if(channel !== undefined && channel.length > 0 && 
       userFaveStreamersChannels.map(
           function(userChannel) {return userChannel.toLowerCase()})
           .indexOf(channel.toLowerCase()) === -1) {
        $(".channel-add input").val('');
        addChannelToStorage(channel);
        appendFaveStreamerToList(channel);
        var promise = fetchStreamer(channel); 
        promise.then(function() {
            sortChannels();
        });
        
    }
}

function addChannelToStorage(channel) {
    userFaveStreamersChannels.push(channel);
    localStorage.setItem('localStorageFaves', JSON.stringify(userFaveStreamersChannels));
}

function clearChannelsFromStorage() {
    localStorage.setItem('localStorageFaves', JSON.stringify([].concat(defaultUserFaveStreamersChannels)));
    userFaveStreamersChannels = [].concat(defaultUserFaveStreamersChannels);
}

function removeChannelFromStorage(channel) {
    var channelPos = userFaveStreamersChannels.indexOf(channel);
    userFaveStreamersChannels.splice(channelPos, 1);
    localStorage.setItem('localStorageFaves', JSON.stringify(userFaveStreamersChannels));
}

function onAddChannel() {
    $(".channel-add .add-new-channel").click(function() {
        addChannelHandler();
    });

    $(".channel-add input").keyup(function(e) {
        if(e.which === 13) 
            addChannelHandler();
    });    
}

function prohibitAddingOptions() {
    $('.channel-add input').keypress(function(e) {
        if(e.which === 35) return false;
    });
}

function onClearStorage() {
    $('.clear-local-storage input').click(function() {
        clearChannelsFromStorage();
        clearFaveStreamersList();
        clearFaveStreamersChannels();
        populateFaveStreamersList();
        fetchFaveStreamersChannels();        
    });
}

function clearFaveStreamersList() {
    $("#fav-streamers-list").empty();
}

function clearFaveStreamersChannels() {
    $("#fav-streamers-boxes-information").empty();
}

function fetchFaveStreamersChannels() {
    var allStreamersPromises = [];
    var allChannelsPromises = [];
    for (var i = 0; i < userFaveStreamersChannels.length; i++) {
        var channel = userFaveStreamersChannels[i];
        allStreamersPromises.push(fetchStreamer(channel));
        allChannelsPromises.push(fetchChannel(channel));
    }

    Promise.all([...allStreamersPromises, ...allChannelsPromises]).then(function() {
        sortChannels();
    });
}

function fetchStreamer(channel) {
    return new Promise(function(resolve, reject) {
        var channelUrl = 'https://api.twitch.tv/kraken/streams/' + channel + '/?client_id=' + clientKey;
        var fetchPromise = fetch(channelUrl);

        fetchPromise.done(function(res) {
            parseApiResponse(channel, res);
            resolve();
        });
        fetchPromise.fail(function(){
            $('#fav-streamer-' + channel).addClass('not-found');
            resolve();
        })
    });    

}

function fetchChannel(channel) {
    return new Promise(function(resolve, reject) {
        var channelUrl = 'https://api.twitch.tv/kraken/channels/' + channel + '/?client_id=' + clientKey;
        var fetchPromise = fetch(channelUrl);

        fetchPromise.done(function(res) {
            parseUnavailableStreamer(channel, res);
            resolve();
        });
        fetchPromise.fail(function(){
            $('#fav-streamer-' + channel).removeClass('offline').addClass('not-found');
            resolve();
        })
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
            <a id='link-{0}' href='{1}' title='{0}' target='_blank'> \
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
    else if (res.stream === undefined || res.stream === null) {
        if(!$('#fav-streamer-' + channel).hasClass('not-found')) {
            $('#fav-streamer-' + channel).addClass('offline');
            $('#link-' + channel).attr('href', "https://www.twitch.tv/" + channel);            
        }
    }    
    else if (res.stream !== undefined && res.stream !== null) {
        $('#fav-streamer-' + channel).addClass('online');
        $('#link-' + channel).attr('href', "https://www.twitch.tv/" + channel);
        buildFaveStreamersBoxes(channel, res);
    }
    
}

function parseUnavailableStreamer(channel, res) {
    if(res=== null || res.status === 400) 
    {
        $('#fav-streamer-' + channel).removeClass('offline').addClass('not-found');
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
        <a id='link-{0}' href='#' title='{0}' target='_blank'>{0}</a>\
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
        removeChannelFromStorage(channel);

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

function sortChannels() {
    var selection = $('#fav-streamers-list')
    
    selection.find('.not-found').prependTo(selection);
    selection.find('.offline').prependTo(selection);
    selection.find('.online').prependTo(selection);
}