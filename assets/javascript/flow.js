//returns % of how often someone votes party line, or in case of independents, their leaning
function bipartisanScore(party, democratVotes, republicanVotes) {
	var biPartsianScore;
	if( party == 'D') {
		biPartisanScore = (democratVotes) / (democratVotes + republicanVotes);
	} else if (party == 'R') {
		biPartsianScore = (republicanVotes) / (democratVotes + republicanVotes);
	} else {
		// + number means republican leaning, - means democratic leaning
		biPartisanScore = (republicanVotes - democratVotes) / (democratVotes + republicanVotes);
	}
	return bipartisanScore;
}

//clear Profiles

//User enters ZipCode and presses Search
$('#search-btn').on('click', function () {
	event.preventDefault();
	//Check if zipcodeisValid()
	var input = $('#search').val().trim();
	var stateInital;
	if(isNaN(input) && input.length > 2) {
		stateInital = stateValid(input);
	}
	else if(isNaN(input) && input.length === 2) {
		stateInital = initalValid(input);
	}
	else if(zipcodeIsValid(input)) {
		findStateAndCity(input);
	} 
	else if(!zipcodeIsValid(input)){
		//If NO (not 5 characters/has letters etc)
			//Throw modal under search bar to tell user to enter 5 numbers
		Materialize.toast('Please enter a valid Zipcode!', 4000);
	}
	
	//added this to clear the input field out after user hits button
	$('#search').val("");
	$("#search-label").removeClass("active");
});