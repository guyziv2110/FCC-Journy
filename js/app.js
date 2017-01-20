var locationResolved = false;
var geoLocationError = 'No geolocation support available.';
var appId = '98c459191c68b713dc26be6eda890149';

window.onload = function() {
    geolocationFirstPlan();
};

function geolocationFirstPlan() {
    var location_timeout = setTimeout(function() {onGeolocationTimeout(geoLocationError);}, 2000);

    if(navigator.geolocation)
    {
        var options = {timeout:1000,maximumAge:0};
        navigator.geolocation.getCurrentPosition(onGeolocationLocationResolved, geolocationSecondPlan, options);
    }
    else {
        geolocationSecondPlan();
    }
}

function geolocationSecondPlan() {
    $.ajax({
        url: 'http://ipinfo.io/json',
        success: function(response) {
            locationResolved = true;
            var pos = splitLocation(response.loc);
            getCurrentWeather(pos.lat, pos.lon, updateUI);
        }
    });
}

/* timeouts/errors */
function onGeolocationTimeout(errMsg) {
    if(!locationResolved) {
        $('.local-weather-error').text(errMsg);
        $('.local-weather-error').css('display', 'block');
        $('.local-weather-info').css('opacity', '1');
    }        
}

function onGeolocationLocationResolved(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    locationResolved = true;
    getCurrentWeather(latitude, longitude, updateUI);
}

function getCurrentWeather(lat, lon, upUI) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + appId,
        success: function(response) {
            upUI(response);
        }
    });
}

function updateUI(res) {
    $('.local-weather-error').css('display', 'none');
    $('.local-weather-degrees').text(getWeatherDegrees(res));
    $('.local-weather-icon').css('background-image', getWeatherIcon(res));
    $('.local-weather-description').text(getWeatherDescription(res));    
    $('.local-weather-info').css('opacity', '1');
    $('.local-weather-degrees').click(function() {
        var val = parseFloat($(this).text());
        var typ;
        var res;
        if($(this).hasClass('celsius')) {
            res = convertToFahrenheit(val);
            typ = String.fromCharCode(8457);
            $(this).removeClass('celsius').addClass('fahrenheit');
        }
        else {
            res = convertToCelsius(val);
            typ = String.fromCharCode(8451);
            $(this).removeClass('fahrenheit').addClass('celsius');
        }

        $(this).text(res + typ);
    });
}

function convertToFahrenheit(cels) {
    return Math.round((cels * (9 / 5)) + 32);
}

function convertToCelsius(fare) {
    return Math.round((fare - 32) * (5 / 9));
}

/* Generic location helpers */
function splitLocation (loc) {
    var obj = loc.split(',').reduce(function(acc, cur, i) {
        var key = i ? 'lon' : 'lat';
        acc[key] = cur;
        return acc;
    }, {});

    return obj;
}

/* Weather helpers */
function getWeatherDegrees(weatherObj) {
    var deg = Math.round(weatherObj.main.temp);

    return deg + String.fromCharCode(8451);
}

function getWeatherIcon(weatherObj) {
    var iconCode = weatherObj.weather[0].icon;
    var iconUrl = "url(http://openweathermap.org/img/w/" + iconCode + ".png)"

    return iconUrl;
}

function getWeatherDescription(weatherObj) {
    var desc = weatherObj.weather[0].description;

    return desc.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}