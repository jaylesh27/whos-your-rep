//User enters ZipCode and presses Search
$('#search-btn').on('click', function () {
	event.preventDefault();
	//Check if zipcodeisValid()
	var query = $('#search').val().trim();
	if(!zipcodeIsValid(query)) {
		//If NO (not 5 characters/has letters etc)
			//Throw modal under search bar to tell user to enter 5 numbers
		Materialize.toast('Please enter a valid Zipcode!', 4000);
	} else {
		//If YES
		findStateAndCity(query);
			//Check if in America
				//If NO
					//Tell user to enter American postal Code
				//If YES
					//Get what STATE they are from in and feed it to Propublica API
						//Propublica Sends request for members using STATE
							//Propublica recieves State senators info and twitter handle
								//feed twitter Handle to twitterGetProfilePics() function
									//populate DOM with 
	}
});
