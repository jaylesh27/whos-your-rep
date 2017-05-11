var googleMapsAPI = 'AIzaSyAQ34rbfQcs_hp036e8ORnMuoAfULzj74U';

//This will get parameters added after it
var googleBaseURL = 'https://www.google.com/maps/embed/v1/MODE?key=' + googleMapsAPI;

var geo = new google.maps.Geocoder;
geo.geocode({'address':address},function(results, status){
    if (status == google.maps.GeocoderStatus.OK) {              
        var myLatLng = results[0].geometry.location;
        console.log(myLatLng);
        
    } else {
        alert("Geocode was not successful for the following reason: " + status);
    }
});