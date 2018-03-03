

  // Get location form
  var locationForm = document.getElementById('filter');

  // Listen for submiot
  //locationForm.addEventListener('submit', geocode)

  function geocode(e){
    // Prevent actual submit
    if (window.location.pathname.includes('listing')) {
      e.preventDefault();
    }

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
  
     
      if (window.location.pathname.includes('listing')) {
        var startDate = $('#checkIn').val()
        var endDate = $('#checkOut').val()
        window.location = window.location.origin + "/listings/1?limit=35&lat=" + lat + "&lng=" + lng + "&guest_count=5" + "&start_date=" + startDate + "&end_date=" + endDate;
      }
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