'use strict';
//initialize module 'terptrack'
var terpTrack = angular.module("terpTrack", []);





//Open Upload Menu
$(".doit").click(function(){
  $(".upload-screen").css("height", "100%");
});
//Close Upload Menu
function closeUp(){
  $(".upload-screen").css("height", "0%");
  
}

$("#closeUpload").click(function(){
  $(".upload-screen").css("height", "0%");
});
/* Open Register Overlay*/
$("#reg").click(function () {
$("#myNav").css("height", "100%");
  $(".signin").hide();
});


/* Close Register Overlay*/
function closeNav() {
  $(".signin").show();
    document.getElementById("myNav").style.height = "0%";
}






//GOOGLE MAPS
function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
      var infoWindow = new google.maps.InfoWindow({map: map});

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    }
