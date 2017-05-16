var googleMapsAPI = 'AIzaSyAQ34rbfQcs_hp036e8ORnMuoAfULzj74U';
var longitude, latitude;
var fullState = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", 
"connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", 
"indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", 
"massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", 
"nebraska", "nevada", "new hampshire",	"new jersey", "new mexico", "new york", 
"north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", 
"rhode island", "south carolina", "south dakota", "tennessee", "texas"	"utah", 
"vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming"];	

var shortState = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", 
"ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", 
"MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK","OR", "PA", "RI", 
"SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

//verifies state name 
function stateValid(stateName) {
	var valid = false;
	var index = 0;
	var inital;
	while(valid != true && index < fullState.length){
		if(stateName === fullState[index]){
			valid = true;
			inital = shortState[index];
		}
		else {
			index++;
		}
	}
	return inital;
}
//verifies initals of state and returns it if it is a state inital
function initalValid(initals) {
	var valid = false;
	var index = 0;
	var inital;
	while(valid != true && index < shortState.length){
		if(initals === shortState[index]){
			valid = true;
			inital = initals;
		}
		else {
			index++;
		}
	}
	return inital;
}

//checks if Zipcode put in search bar is at least reasonable
function zipcodeIsValid (zipcode) {
	//if zipcode isn't 5 long, automatically wrong
	if (zipcode.length != 5) {
		return false;
	} else {
		//loop through 5 chars, and make sure each are a number
		for (var i = 0; i < 5; i++) {
			//if the current character is a non-number
			if(zipcode.charCodeAt(i) < 48 || zipcode.charCodeAt(i) > 57) {
				return false;
			}
		}
		//if there was not a single non-number and the length is 5, return true
		return true;
	}
}

function clearProfiles() {
	$('#profiles').html('');
}

//Possible To-Do - make array to check state codes against AL, NJ, TX, etc
function findStateAndCity (zipCode) {	
	var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+zipCode;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function (response) {
		//extract State and longitude/latitude from Zip Code
		var state;
		console.log(response);
		var test = response.results[0].geometry.location;
		longitude = response.results[0].geometry.location.lng;
		latitude = response.results[0].geometry.location.lat;
		var baseCenterMap = 'https://www.google.com/maps/embed/v1/view?key='+googleMapsAPI+'&center='+latitude+','+longitude+'&zoom=12';
		//Check if location is in USA first
		var inUSA=false;
		//look through elements in components
		//check Long Name to see if equal to United States
		for(elements in response.results[0].address_components){
			var long_name = response.results[0].address_components[elements].long_name;
			// console.log(response.results[0].address_components[elements].short_name);
			if (long_name === 'United States') {
				console.log('It\'s in the USA!');
				inUSA = true;
				break;
			}
		}
		//Check if in America
		//if not in the USA, throw error message on DOM
			//If NO
				//Tell user to enter American postal 
		if(!inUSA){
			Materialize.toast('Please enter a ZipCode in the USA', 4000);
		} else{
			for(elements in response.results[0].address_components){
				var short_name = response.results[0].address_components[elements].short_name;
				// console.log(response.results[0].address_components[elements].short_name);
				if (short_name.length === 2) {
					state=short_name;
					break;
				}
			}
			$('#gMap').attr('src', baseCenterMap);
			//If YES
			//clear current profile div
			clearProfiles();
			//Get what STATE they are from in and feed it to Propublica 
			proPublicaAPI(state);
					//Propublica Sends request for members using STATE
						//Propublica recieves State senators info and twitter handle
							//feed twitter Handle to twitterGetProfilePics() function
								//populate DOM with	
		}
	});
}