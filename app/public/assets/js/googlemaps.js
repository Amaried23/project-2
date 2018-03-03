/ Initialize Google Maps API -------------------

function initMap() {
  $(document).on('click', '.map-btn', function () {
    mapLocation = $(this).attr('data-loc');
    codeAddress();
  });

 function codeAddress() {
    var myLatLng;
    var map;
    var marker;
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode({ 'address': mapLocation }, function (results, status) {
      if (status == 'OK') {
        myLatLng = results[0].geometry.location;
        marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location

       });
        showMap(myLatLng)
        return myLatLng
      } else {
        console.log('geocode error');
      }
    });
  };

 function showMap(myLatLng) {
    console.log(myLatLng)

   // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 13
    });
    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
    });
    $("#mapModal").on("shown.bs.modal", function (e) {
      google.maps.event.trigger(map, "resize");
      return map.setCenter(myLatLng);
    });
  };
};
// ---------------------------
// Assigning receiver variable locally
$(document).on('click', '.contact-modal-btn', function () {
  console.log('modal')
  receiver = $(this).attr('data-email')
  console.log(receiver)
});