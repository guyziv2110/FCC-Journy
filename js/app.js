/*navigator.geolocation.getCurrentPosition(function(location) {
  console.log(location.coords.latitude);
  console.log(location.coords.longitude);
  console.log(location.coords.accuracy);
  console.log(location);
});*/
var locationResolved = false;

window.onload = function() {
    if(navigator.geolocation)
    {
        var options = {timeout:3000};
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    }
    else {
        //alert("NO");
    }
};

$(document).ready(function() {
    setTimeout(function() {
        if(!locationResolved) {
          //  alert('failed');
        }
        // location already resolved
        else {
            //alert('good');
        }

        // maybe reload this image so it will load faster 
        // OR resize the image so it will be smaller and be loaded faster.
        
        //$('.container').css('background-image', 'url()');
        
    }, 6000);    
});

function showLocation(position) {
    locationResolved = true;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getCurrentWeather(latitude, longitude, updateUI);
  //  alert("Latitude : " + latitude + " Longitude: " + longitude);
}

function updateUI(res) {
    console.log(res);
    var weatherCondition = getWeatherCondition(res.weather[0].icon);
    console.log(weatherCondition);
    if(weatherCondition !== 'clear-sky-day' && weatherCondition !== 'clear-sky-night'
        && weatherCondition !== 'few-clouds-day' && weatherCondition !== 'few-clouds-night')
        $('.container').removeClass('hot-weather').addClass('cold-weather');

    
}

function errorHandler(err) {
    console.log(err);
    var errMsg;
    if(err.code == 1) {
        errMsg = "Error: Access is denied! (Reason : " + err.message +")";
    }

    else if( err.code == 2) {
        errMsg = "Error: Position is unavailable! (Reason : " + err.message +")";
    }

    //alert(errMsg);
}


function getCurrentWeather(lat, lon, upUI) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=98c459191c68b713dc26be6eda890149',
        success: function(response) {
            upUI(response);
        }
    })
}

function getWeatherCondition(weatherIcon) {
    switch(weatherIcon) {
        case '01d': return 'clear-sky-day';
                    break;
        case '01n': return 'clear-sky-night';
                    break;
        case '02d': return 'few-clouds-day';
                    break;
        case '02n': return 'few-clouds-night';
                    break;                    
        case '03d': return 'scattered-clouds-day';
                    break;
        case '03n': return 'scattered-clouds-night';
                    break;                                
        case '04d': return 'broken-clouds-day';
                    break;
        case '04n': return 'broken-clouds-night';
                    break;
        case '09d': return 'shower-rain-day';
                    break;
        case '09n': return 'shower-rain-night';
                    break;      
        case '10d': return 'rain-day';
                    break;
        case '10n': return 'rain-night';
                    break; 
        case '11d': return 'thunderstorm-day';
                    break;
        case '11n': return 'thunderstorm-night';
                    break;
        case '13d': return 'snow-day';
                    break;
        case '13n': return 'snow-night';
                    break;    
        case '50d': return 'mist-day';
                    break;
        case '50n': return 'mist-night';
                    break;                                                                                                               
    }

}