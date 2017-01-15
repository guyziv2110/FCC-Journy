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
        
    }, 6000);    
});

function showLocation(position) {
    locationResolved = true;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
  //  alert("Latitude : " + latitude + " Longitude: " + longitude);
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

