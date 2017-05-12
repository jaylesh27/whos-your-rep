var googleMapsAPI = 'AIzaSyAQ34rbfQcs_hp036e8ORnMuoAfULzj74U';

function findStateandCity (zipCode) {
	var state;
	var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+zipCode;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function (response) {
		console.log(response.results[0].address_components[3].short_name);
		return response.results;
	});
}