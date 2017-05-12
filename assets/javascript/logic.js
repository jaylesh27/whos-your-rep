var googleMapsAPI = 'AIzaSyAQ34rbfQcs_hp036e8ORnMuoAfULzj74U';

//Possible To-Do - make array to check state codes against AL, NJ, TX, etc

function findStateandCity (zipCode) {
	
	var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+zipCode;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function (response) {
		var state;
		console.log(response.results[0].address_components[3].short_name);
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

		console.log('State Found: ' + state);
		runProPublicaAPI(state);
	});
}

function runProPublicaAPI (state) {
	console.log('The State is ' + state);
}