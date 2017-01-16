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
        $('.container').css('background-image', 'url(https://s20.postimg.org/aybrjblm5/snow_mountain_wallpaper_high_definition.jpg)');
        
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
