// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

/* scripts for map */

var currentCircle;

var fogButton = document.getElementsByClassName('fog');
var cloudyButton = document.getElementsByClassName('cloud');
var sunButton = document.getElementsByClassName('sun');

function initialize() {
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(37.768, -122.442),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      // Place marker
      new google.maps.Marker ({
        map: map,
        position: pos
      });


      // Circle showing user location
      var circle = {
        center: pos,
        radius: position.coords.accuracy,
        map: map,
        fillColor: '#0000FF',
        fillOpacity: 0.3,
        strokeColor: '#0000FF',
        strokeOpacity: 0.3
      };

      // Circles to indicate type of fog-cover
      var fogCircle = {
        center: pos,
        radius: position.coords.accuracy,
        map: map,
        fillColor: '#333333',
        fillOpacity: 0.3,
        strokeColor: '#333333',
        strokeOpacity: 0.3
      };

      var cloudyCircle = {
        center: pos,
        radius: position.coords.accuracy,
        map: map,
        fillColor: '#c2b280',
        fillOpacity: 0.5,
        strokeColor: '#c2b280',
        strokeOpacity: 0.5
      };

      var sunCircle = {
        center: pos,
        radius: position.coords.accuracy,
        map: map,
        fillColor: '#ffff00',
        fillOpacity: 0.3,
        strokeColor: '#ffff00',
        strokeOpacity: 0.3
      };

//      function getElementsByIds(Ids) {
//        idArr = Ids.split(" ");
//        return idArr;
//      }
//
//      getElementsByIds('fogCircle fogCircle2 cloudyCircle cloudyCircle2 sunCircle sunCircle2');

      var fogButton = document.getElementById('fogCircle');
      var cloudyButton = document.getElementById('cloudyCircle');
      var sunButton = document.getElementById('sunCircle');

      google.maps.event.addDomListener(fogButton, 'click', function() {
        currentCircle = new google.maps.Circle(fogCircle);
      });

      google.maps.event.addDomListener(cloudyButton, 'click', function() {
        currentCircle = new google.maps.Circle(cloudyCircle);
      });

      google.maps.event.addDomListener(sunButton, 'click', function() {
        currentCircle = new google.maps.Circle(sunCircle);
      });

      var fogButton2 = document.getElementById('fogCircle2');
      var cloudyButton2 = document.getElementById('cloudyCircle2');
      var sunButton2 = document.getElementById('sunCircle2');

      google.maps.event.addDomListener(fogButton2, 'click', function() {
        currentCircle = new google.maps.Circle(fogCircle);
      });

      google.maps.event.addDomListener(cloudyButton2, 'click', function() {
        currentCircle = new google.maps.Circle(cloudyCircle);
      });

      google.maps.event.addDomListener(sunButton2, 'click', function() {
        currentCircle = new google.maps.Circle(sunCircle);
      });

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
};

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(37.768, -122.442),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
};


function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;


/* script for main modal */

$(function() {
  $('#fogStates').modal('show');

  $('.btn').click(function() {
    $('#fogStates').modal('hide')
    $('#comeBack').modal('hide')
  });

  var modalCycle = function() {
    $('#comeBack').modal('show')

    $('#showMap').click(function() {
      $('#comeBack').modal('hide')
    });
  };

  $('#fogStates').on('hidden', function() {
    if (currentCircle == undefined) {
      modalCycle();
    };
  });


  /* scripts for sidebar */

  $('#dragBar').on('click', function() {
    $('.sideBar').toggleClass('sideBarOut');
    $('i').toggleClass('iRotate');
  });

});
