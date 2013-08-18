// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

/* script for main modal */

$(window).load(function() {
  $('#fogStates').modal('show');
  $('#fogStates').on('hide', function() {
    $('#comeBack').modal('show')
  });
  $('#showMap').click(function() {
    $('#comeBack').modal('hide')
  });


  /* scripts for sidebar */

  $('#dragBar').on('click', function() {
    $('.sideBar').toggleClass('sideBarOut');
    $('i').toggleClass('iRotate');
  });
//   $(this).toggle(
//   function() {
//     $('.sideBar').animate({ "left": "-=40%" }, "slow" );
//     $('i').css( "-webkit-transform", "rotate(180deg)" );
//   },
//   function() {
//     $('.sideBar').animate({ "left": "+=40%" }, "slow" );
//     $('i').css( "-webkit-transform", "rotate(180deg)" );
//   });
// });
});

/* scripts for map */

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
      var circle = new google.maps.Circle ({
        center: pos,
        radius: position.coords.accuracy,
        map: map,
        fillColor: '#0000FF',
        fillOpacity: 0.3,
        strokeColor: '#0000FF',
        strokeOpacity: 0.3
      });

//    map.setCenter(pos);      Is this necessary?

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
