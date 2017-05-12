var googleMapsAPI = 'AIzaSyAQ34rbfQcs_hp036e8ORnMuoAfULzj74U';
var longitude, latitude;

//Possible To-Do - make array to check state codes against AL, NJ, TX, etc
function findStateandCity (zipCode) {	
	var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+zipCode;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function (response) {
		//extract State and longitude/latitude from Zip Code
		var state;
		var test = response.results[0].geometry.location;
		longitude = response.results[0].geometry.location.lng;
		latitude = response.results[0].geometry.location.lat;
		console.log(response.results[0].geometry.location);
		console.log('lng: ' + longitude);
		console.log('lat: ' + latitude);
		var baseCenterMap = 'https://www.google.com/maps/embed/v1/view?key='+googleMapsAPI+'&center='+latitude+','+longitude+'&zoom=12';
		console.log('Center Map URL');
		//look through elements in components
		//find first one with 2 letter shortname, return as it is state (hopfully)
		//NEED TO REFINE THIS
		for(elements in response.results[0].address_components){
			var short_name = response.results[0].address_components[elements].short_name;
			console.log(response.results[0].address_components[elements].short_name);
			if (short_name.length === 2) {
				state=short_name;
				break;
			}
		}
		$('#gMap').attr('src', baseCenterMap);
		console.log('State Found: ' + state);
		runProPublicaAPI(state);
	});
}

function runProPublicaAPI (state) {
	console.log('The State is ' + state);
}