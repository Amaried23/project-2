function initMap(){
    var input = document.getElementById("filterAddress");
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  // Get location form
  var locationForm = document.getElementById('filter');

  // Listen for submiot
  //locationForm.addEventListener('submit', geocode)

  function geocode(e){
    // Prevent actual submit
    e.preventDefault();

    var location = document.getElementById('filterAddress').value;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
      params:{
        address:location,
        key:'AIzaSyCH-6r9WrlUwy1swTIHIYFrm4IcXcjZDEk'
      }
    })
    .then(function(response){
      // Log full response
      console.log(response);

      // Formatted Address
      var formattedAddress = response.data.results[0].formatted_address;

      // Address Components
      var addressComponents = response.data.results[0].address_components;


      // Geometry
      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;

      document.getElementById('geometry').innerHTML = geometryOutput;
    })
    .catch(function(error){
      console.log(error);
    });
  }

  $(function() {
    $('.filterButton').on('click', function(e) {
      geocode(e);
    })
  })